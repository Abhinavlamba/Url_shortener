const express = require ('express')
const shortid = require('shortid')
var bodyParser = require('body-parser');
const router = express.Router()
const myUrl = "https://shorten-your-url-s.herokuapp.com/"
const Url = require('./models/Urls')
var urlencodedParser = bodyParser.urlencoded({extended: false});
router.get('', (req,res) => {
    res.render('todo')
})
router.post('/shortenurl',urlencodedParser,async (req,res) => {
    const {url} = req.body
    const code = shortid.generate()
    console.log(req.body)
    try {
        var dburl = await Url.findOne({url})
        const currentTime = (Date.now()/60000)
        if (dburl)
        {
            if (currentTime > dburl.expiryPeriod)
            {
                const shortenUrl = myUrl + code
                const createdTime = (Date.now()/60000)
                // Let expiry time be five minutes
                const expiryPeriod = createdTime + 5;
                Url.findOneAndDelete({url}, () => {
                dburl = new Url ({code,url, shortenUrl, createdTime , expiryPeriod})
                dburl.save()
                res.json(dburl)
                })
            }
            else
            {
            res.json(dburl)
            }
        }
        else 
        {
            const shortenUrl = myUrl + code
            const createdTime = (Date.now()/60000)
            // Let expiry time be five minutes
            const expiryPeriod = createdTime + 5;
            dburl = new Url ({code,url, shortenUrl, createdTime , expiryPeriod})
            dburl.save()
            res.json(dburl)
        }
    }
    catch(error) {
        console.log(error.message)
        res.status(500).json({'error' : 'Server Error'})
    }
})

module.exports = router