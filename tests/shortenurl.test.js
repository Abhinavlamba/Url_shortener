const request = require('supertest')
const app = require('../index')
const Url = require('../models/Urls')
const connectDatabase = require('../Network/database')


const baseUrl = "https://shorten-your-url-s.herokuapp.com/"

const testUrl = {
    url: "https://www.yahoo.com/",
    base_url: "https://shorten-your-url-s.herokuapp.com/",
    test: "https//www.facebook.com/",
    opensource: "https://github.com/"
}
let db = true
beforeEach(async(done) => {
    if (db == false) {
        db = true
        await connectDatabase.connect()
        done()
    } else {
        done()
    }
})

afterAll(async(complete) => {
    await Url.findOneAndDelete({ code: shortenCode })
    complete()
})
var shortenCode
test('New Url request should be processed everytime', async(done) => {
    await request(app)
        .post('/url/shortenurl')
        .send(testUrl)
        .expect(200)
    const url = await Url.findOne({ url: testUrl.url })
    const code = url.code
    shortenCode = code
    expect(url).not.toBeNull()
    expect(url.url).toEqual(testUrl.url)
    expect(url.shortenUrl).toEqual(baseUrl + code)
    expect(url.expiryPeriod - url.createdTime).toEqual(5)
    done()
})

test('Redirection should take place', async(complete) => {
    await request(app)
        .get('/' + shortenCode)
        .send()
        .expect(302)
    complete()
})