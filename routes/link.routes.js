const {Router} = require('express')
const shortid = require('shortid')
const Link = require('../models/link')
const auth = require('../middleware/auth_middleware')
const config = require('config')

const router = Router()

router.post('/generate', auth, async (req, res) => {
    try {

        const baseUrl = config.get('baseUrl')
        const {from} = req.body

        const code = shortid.generate()

        const existing = await Link.findOne({from: code})

        if (existing) {
            return res.json({link: existing})
        }

        const to = baseUrl + '/t/' + code
        const link = new Link({
            code, to, from, owner: req.user.userId
        })
        await link.save()

        res.status(201).json({link})
    } catch (e) {
        res.status(500).json({message: 'Internal Server Error'})
    }
})

router.get('/', auth, async (req, res) => {
    try {
        const links = await Link.find({ owner: req.user.userId})
        res.json(links)
    } catch (e) {
        res.status(500).json({message: 'Internal Server Error'})
    }
})

router.get('/:id', auth, async (req, res) => {
    try {
        const links = await Link.findById(req.params.id)
        res.json(links)
    } catch (e) {
        res.status(500).json({message: 'Internal Server Error'})
    }
})

module.exports = router
