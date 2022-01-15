const { Router } = require("express");
const router = Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const { check, validationResult } = require("express-validator");
const jwt = require('jsonwebtoken');
const config = require("config");
// /api/auth
router.post(
   '/register',
   [
      check('email', 'Некорректный email').isEmail(),
      check('password', 'Минимальная длина пароля 6 символов')
         .isLength({ min: 6 })
   ],
   async (req, res) => {
      try {
         const errors = validationResult(req);
         console.log('Body:', req.body);
         if (!errors.isEmpty()) {
            return res.status(400).json({
               errors: errors.array(),
               message: 'Неккоректные данные при регистрации'
            })
         }
         const { email, password } = req.body;

         const candidate = await User.findOne({ email });

         if (candidate) {
            return res.status(400).json({ message: 'Такой email уже существует.' });
         }

         const hashedPassword = await bcrypt.hash(password, 12);

         const user = new User({ email, password: hashedPassword });

         await user.save();

         res.status(201).json({ message: 'Пользоавтель создан' });

      } catch (e) {
         res.status(500).json({ message: 'Что-то пошло не так попробуйте снова' });
      }
   })
router.post(
   '/login',
   [
      check('email', 'Введите корректный email').normalizeEmail().isEmail(),
      check('password', 'Введите правильный пароль').exists()
   ],
   async (req, res) => {
      try {
         const errors = validationResult(req);

         if (!errors.isEmpty()) {
            return res.status(400).json({
               errors: errors.array(),
               message: 'Неккоректные данные при входе в систему'
            })
         }

         const { email, password } = req.body;

         const user = await User.findOne({ email });

         if (!user) {
            return res.status(400).json({ message: 'Пользователь не существует' })
         }

         const isMatch = await bcrypt.compare(password, user.password)

         if (!isMatch) {
            return res.status(400).json({ message: 'Пароль не верный, попробуйте снова' })
         }

         const token = jwt.sign(
            { userId: user.id },
            config.get('jwtSecret'),
            { expiresIn: '1h' }
         )

         res.json({ token, userId: user.id })
      } catch (e) {
         res.status(500).json({ message: 'Что-то пошло не так попробуйте снова' });
      }
   })



module.exports = router;