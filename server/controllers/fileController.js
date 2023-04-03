const fileService = require('../services/fileService')
const config = require('config')
const fs = require('fs')
const User = require('../models/User')
const File = require('../models/File')
const Uuid = require('uuid')

class FileController {
    async createDir(req, res) {
        try {
            const {name, type, parent} = req.body
            const file = new File({name, type, parent, user: req.user.id})
            const parentFile = await File.findOne({_id: parent})
            if (!parentFile) {
                file.path = name
                await fileService.createDir(file)
            } else {
                file.path = `${parentFile.path}\\${file.name}`
                await fileService.createDir(file)
                parentFile.childs.push(file._id)
                await parentFile.save()
            }
            await file.save()

            return res.json(file)
        } catch (e) {
            console.log(e)
            return res.status(400).json(e)
        }
    }

    async getFiles(req, res) {
        try {
            const files = await File.find({user: req.user.id, parent: req.query.parent});
            console.log(files);

            for (const file of files) {
                if (file.type === 'dir') {
                    const dirPath = `${config.get('filePath')}\\${req.user.id}\\${file.path}`;
                    file.size = await fileService.getDirectorySize(dirPath);
                }
            }
            return res.json(files);
        } catch (e) {
            console.log(e);
            return res.status(500).json({message: 'Can not get files'});
        }
    }


    async uploadFile(req, res) {
        try {
            const file = req.files.file

            const parent = await File.findOne({user: req.user.id, _id: req.body.parent})
            const user = await User.findOne({_id: req.user.id})

            if (user.usedSpace + file.size > user.diskSpace) {
                return res.status(400).json({message: 'There no space on the disk'})
            }

            user.usedSpace = user.usedSpace + file.size

            // console.log(`file        : ${file.size}`)
            // console.log(`total_real  : ${file.size + user.usedSpace}`)

            // make sure to available of utf-8
            const originalFilename = file.name;
            const filenameBuffer = Buffer.from(originalFilename, 'binary');
            const utf8Filename = filenameBuffer.toString('utf-8');

            let path;
            if (parent) {
                path = `${config.get('filePath')}\\${user._id}\\${parent.path}\\${utf8Filename}`
            } else {
                path = `${config.get('filePath')}\\${user._id}\\${utf8Filename}`
            }

            if (fs.existsSync(path)) {
                return res.status(400).json({message: 'File already exist'})
            }
            file.mv(path)

            const type = utf8Filename.split('.').pop()
            let filePath = utf8Filename
            if (parent) {
                filePath = parent.path + "\\" + utf8Filename
            }
            const dbFile = new File({
                name: utf8Filename,
                type,
                size: file.size,
                path: filePath,
                parent: parent?._id,
                user: user._id
            });

            await dbFile.save()
            await user.save()

            res.json({file:dbFile, usedSpace: user.usedSpace})
        } catch (e) {
            console.log(e)
            return res.status(500).json({message: "Upload error"})
        }
    }

    async downloadFile(req, res) {
        try {
            const file = await File.findOne({_id: req.query.id, user: req.user.id})

            const path = config.get('filePath') + '/' + req.user.id + '/' + file.path;
            if (fs.existsSync(path)) {
                return res.download(path, file.name);
            }
            return res.status(400).json({message: "Download error"})
        } catch (e) {
            console.log(e)
            res.status(500).json({message: "Download error"})
        }
    }

    async deleteFile(req, res) {
        try {
            const user = await User.findOne({_id: req.user.id})
            const file = await File.findOne({_id: req.query.id, user: req.user.id})

            if (!file) {
                return res.status(400).json({message: 'file not found'})
            }

            await fileService.deleteFile(file)

            await File.deleteOne({_id: req.query.id, user: req.user.id})
            user.usedSpace = user.usedSpace - file.size
            await user.save()
            return res.json({usedSpace: user.usedSpace})

        } catch (e) {
            console.log(e)
            return res.status(400).json({message: 'Dir is not empty'})
        }
    }

    async searchFiles(req, res) {
        try {
            const searchName = req.query.search.toLowerCase()
            let files = await File.find({user: req.user.id})
            files = files.filter(file => file.name.toLowerCase().includes(searchName))
            return res.json(files)
        } catch (e) {
            return res.status(400).json({message: 'Search error'})
        }
    }

    async uploadAvatar(req, res) {
        try {
            const file = req.files.file
            const user = await User.findById(req.user.id)
            const avatarName = Uuid.v4() + ".jpg"
            await file.mv("C:\\Users\\User\\WebstormProjects\\cloud-disk\\server\\static" + "\\" + avatarName)
            user.avatar = avatarName
            await user.save()
            return res.json(user)
        } catch (e) {
            console.log(e)
            return res.status(400).json({message: 'Upload avatar error'})
        }
    }

    async deleteAvatar(req, res) {
        try {
            const user = await User.findById(req.user.id)
            fs.unlinkSync(config.get('staticPath') + "\\" + user.avatar)
            user.avatar = null
            await user.save()
            return res.json(user)
        } catch (e) {
            console.log(e)
            return res.status(400).json({message: 'Delete avatar error'})
        }
    }
}

module.exports = new FileController()