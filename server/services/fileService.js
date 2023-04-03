const fs = require('fs')
const config = require('config')
const path = require("path");

class FileService {

    createDir(file) {
        const filePath = `${config.get('filePath')}\\${file.user}\\${file.path}`
        return new Promise(((resolve, reject) => {
            try {
                if (!fs.existsSync(filePath)) {
                    fs.mkdirSync(filePath)
                    return resolve({message: 'File was created'})
                } else {
                    return reject({message: "File already exist"})
                }
            } catch (e) {
                return reject({message: 'File error'})
            }
        }))
    }

    deleteFile(file) {
        const path = this.getPath(file)
        if (file.type === 'dir') {
            fs.rmdirSync(path)
        } else {
            fs.unlinkSync(path)
        }
    }

    getPath(file) {
        return config.get('filePath') + '\\' + file.user + '\\' + file.path
    }

    async getDirectorySize(dirPath) {
        let totalSize = 0;
        const files = await fs.promises.readdir(dirPath);

        for (const file of files) {
            const filePath = path.join(dirPath, file);
            const stats = await fs.promises.stat(filePath);

            if (stats.isDirectory()) {
                totalSize += await this.getDirectorySize(filePath);
            } else {
                totalSize += stats.size;
            }
        }

        return totalSize;
    }

}


module.exports = new FileService()

//
// Цей код описує клас FileService, який експортується як об'єкт, створений з використанням new FileService(). Цей клас містить метод createDir(), який створює директорію файлу на диску.
// Метод createDir() приймає об'єкт file, який містить інформацію про файл, що має бути створений. Зокрема, об'єкт file містить user (ідентифікатор користувача) та path (шлях до файлу в системі).
// Метод createDir() перевіряє, чи існує директорія з вказаним шляхом filePath. Якщо директорія не існує, то вона створюється з використанням fs.mkdirSync(filePath), та метод повертає об'єкт з повідомленням про створення файлу. Якщо директорія вже існує, метод повертає об'єкт з повідомленням про те, що файл вже існує. Якщо виникла якась помилка при створенні директорії, метод повертає об'єкт з повідомленням про помилку.
