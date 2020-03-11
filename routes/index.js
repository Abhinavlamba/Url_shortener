const express = require('express')

const router = express.Router();

const Url = require('../models/Urls')
router.get('/:code', async(req, res) => {
    try {
        const code = req.params.code
        console.log(code)
        const dbUrl = await Url.findOne({ code })
        const currentTime = Date.now() / 60000
        if (currentTime > dbUrl.expiryPeriod) {
            res.send('Please create new one.')
        } else {
            const originalUrl = dbUrl.url
            return res.redirect(originalUrl)
        }
    } catch (error) {
        res.json({ 'error': 'Server Error' })
    }
})
module.exports = router