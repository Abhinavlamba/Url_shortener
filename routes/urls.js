const express = require ('express')
const shortid = require('shortid')
var bodyParser = require('body-parser')
const router = express.Router()
const myUrl = "https://shorten-your-url-s.herokuapp.com/"
const Url = require('../models/Urls')
var urlencodedParser = bodyParser.urlencoded({extended: false});
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
                await Url.findOneAndDelete({url})
                const shortenUrl = myUrl + code
                const createdTime = (Date.now()/60000)
                // Let expiry time be five minutes
                const expiryPeriod = createdTime + 5;
                dburl = new Url ({code,url, shortenUrl, createdTime , expiryPeriod})
                await dburl.save()
                console.log(dburl.url)
                res.send(dburl)      
            // res.render('todo',{todos:{url : 'test'}})  // res.json(dburl)
            }
            else
            {
                console.log(dburl.url)
                // res.render('todo',{todos:{url : 'test'}})
                res.send(dburl)
            }
        }
        else 
        {
            const shortenUrl = myUrl + code
            const createdTime = (Date.now()/60000)
            // Let expiry time be five minutes
            const expiryPeriod = createdTime + 5;
            dburl = new Url ({code,url, shortenUrl, createdTime , expiryPeriod})
            await dburl.save()
            // res.render('todo',{todos:{url : 'test'}})
            console.log(dburl.url)
            res.send(dburl)
        }
    }
    catch(error) {
        console.log(error.message)
        res.status(500).json({'error' : 'Server Error'})
    }
})

module.exports = router