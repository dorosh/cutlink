const {Router} = require('express')
const Link = require('../models/link')

const router = Router()


router.get('/:code', async (req, res) => {
    try {
        const link = await Link.findOne({code: req.params.code})
        if (link) {
            link.clicks++
            await link.save()
            res.redirect(link.form)
        }
        res.status(404).json({message: 'link not found'})
    } catch (e) {
        res.status(500).json({message: 'Internal Server Error'})
    }
})

module.exports = router
