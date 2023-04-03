const Router = require('express')
const router = new Router()
const authMiddleware = require('../middleware/auth.middleware')
const fileController = require('../controllers/fileController')

router.post('', authMiddleware, fileController.createDir)
router.post('/upload', authMiddleware, fileController.uploadFile)
router.get('', authMiddleware, fileController.getFiles)
router.get('/download', authMiddleware, fileController.downloadFile)
router.get('/search', authMiddleware, fileController.searchFiles)
router.delete('/', authMiddleware, fileController.deleteFile)
router.post('/avatar', authMiddleware, fileController.uploadAvatar)
router.delete('/avatar', authMiddleware, fileController.deleteAvatar)


module.exports = router

// Цей код створює маршрутизатор для обробки HTTP-запитів в Express.js додатку.
// Основна робота цього маршрутизатора пов'язана з обробкою файлів та папок. Він використовує
// два методи HTTP: POST та GET, щоб дозволити клієнтам створювати нові папки та отримувати список
// файлів у відповідь.
// authMiddleware є middleware-ом, який перевіряє чи клієнт має дійсний токен автентифікації перед
// тим як дозволити доступ до функціоналу, захищеного авторизацією.
// Код require() використовується для підключення залежностей, таких як Express, middleware та
// контролери файлів. При цьому передбачається, що ці файли знаходяться в відповідних директоріях
// додатку.
// Завершальний рядок експортує маршрутизатор, щоб його можна було використовувати в інших частинах
// додатку.
