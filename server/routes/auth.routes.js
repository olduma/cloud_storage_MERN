const User = require("../models/User")
const bcrypt = require("bcryptjs")
const {check, validationResult} = require("express-validator")
const express = require('express');
const router = express.Router();
const jwt = require("jsonwebtoken")
const config = require("config")
const authMiddleware = require("../middleware/auth.middleware")
const fileService = require("../services/fileService")
const File = require('../models/File')

router.post("/registration",
    [
        check("email", "Uncorrected email").isEmail(),
        check("password", "Password must be longer than 3 and shorter than 12").isLength({min: 3, max: 12})
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({message: "Uncorrected request", errors})
            }
            const {email, password} = req.body

            const candidate = await User.findOne({email})

            if (candidate) {
                return res.status(400).json({message: `User with email ${email} already exist`})
            }

            const hashPassword = await bcrypt.hash(password, 8)
            const user = new User({email, password: hashPassword})
            await user.save()
            await fileService.createDir(new File({user: user.id, name: ""}))

            return res.json({message: "User was create"})

        } catch (e) {
            console.log(e)
            res.send({message: "Server error"})
        }
    })

router.post("/login",
    async (req, res) => {
        try {
            const {email, password} = req.body
            const user = await User.findOne({email})

            if (!user) {
                return res.status(404).json({message: "User is not found"})
            }

            const isPassValid = bcrypt.compareSync(password, user.password)
            if (!isPassValid) {
                return res.status(400).json({message: "Invalid password"})
            }

            const token = jwt.sign({id: user.id}, config.get("secretKey"), {expiresIn: "1h"})

            return res.json({
                token,
                user: {
                    id: user.id,
                    email: user.email,
                    diskSpace: user.diskSpace,
                    usedSpace: user.usedSpace,
                    avatar: user.avatar
                }
            })

        } catch (e) {
            console.log(e)
            res.send({message: "Server error"})
        }
    })

router.get("/auth", authMiddleware,
    async (req, res) => {
        try {
            const user = await User.findOne({_id: req.user.id})
            const token = jwt.sign({id: user.id}, config.get("secretKey"), {expiresIn: "1h"})

            return res.json({
                token,
                user: {
                    id: user.id,
                    email: user.email,
                    diskSpace: user.diskSpace,
                    usedSpace: user.usedSpace,
                    avatar: user.avatar
                }
            })


        } catch (e) {
            console.log(e)
            res.send({message: "Server error"})
        }
    })


module.exports = router

// Цей код створює маршрутизатор для обробки HTTP-запитів в Express.js додатку, що пов'язаний з обліком користувачів.
// Основна робота маршрутизатора пов'язана з реєстрацією та входом користувачів. Він використовує два методи HTTP: POST та GET, щоб дозволити клієнтам реєструватися та входити в систему.
// Маршрутизатор використовує різноманітні залежності, такі як express-validator, bcrypt, jsonwebtoken, config тощо, для валідації введених даних, генерації токенів, збереження та зчитування інформації користувача з бази даних та забезпечення безпеки даних.
// authMiddleware є middleware-ом, який перевіряє чи клієнт має дійсний токен автентифікації перед тим як дозволити доступ до функціоналу, захищеного авторизацією.
// Завершальний рядок експортує маршрутизатор, щоб його можна було використовувати в інших частинах додатку.