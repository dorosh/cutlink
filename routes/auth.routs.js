const {Router} = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {check, validationResult} = require('express-validator')
const User = require('../models/user')
const config = require('config')

const router = Router()

router.post(
    '/register',
    [
        check('email', 'invalid email').isEmail(),
        check('password', 'Incorect password').isLength({min: 6})
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                console.log(errors)
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'validation errors'
                })
            }
            const {email, password} = req.body
            const candidate = await User.findOne({email})

            if (candidate) {
                return res.status(400).json({message: 'email exists'})
            }
            const hashedPass = await bcrypt.hash(password, 10)
            const user = new User({email, password: hashedPass})
            await user.save()

            res.status(201).json({ message: 'User created'})
        } catch (e) {
            res.status(500).json({message: 'Internal Server Error'})
        }
    }
)

router.post(
    '/login',
    [
        check('email', 'invalid email').normalizeEmail().isEmail(),
        check('password', 'Incorect password').exists()
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'validation errors'
                })
            }
            const {email, password} = req.body
            console.log(email)
            const user = await User.findOne({email})

            if (!user) {
                return res.status(400).json({message: 'user not found'})
            }
            const hashedPass = await bcrypt.hash(password, 10)
            const isMatch = await bcrypt.compare(password, user.password)

            console.log(isMatch, hashedPass, password, user.password, email)

            if (!isMatch) {
                return res.status(400).json({message: 'incorect password'})
            }

            const token = jwt.sign(
                {userId: user.id}, config.get('jwtSecret'), {expiresIn: '1h'}
            )

            res.status(200).json({token, userId: user.id})

        } catch (e) {
            res.status(500).json({message: 'Internal Server Error'})
        }
    }
)

module.exports = router
