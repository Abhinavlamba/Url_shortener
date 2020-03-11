const mongoose = require('mongoose')

const urlSchema = new mongoose.Schema({
    code: String,
    url: String,
    shortenUrl: String,
    createdTime: Number,
    expiryPeriod: Number
})
module.exports = mongoose.model('Urls', urlSchema)