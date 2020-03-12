const express = require('express')
const connectDatabase = require('./Network/database')
var path = require('path')
const app = express()

app.set('view engine', 'ejs');

// static files
app.use('/assets', express.static('./assets'));

app.set('views', path.join(__dirname, 'views'))
app.use(express.json())
app.get('', (req, res) => {
    res.render('todourlshorten', { todos: { url: 'Shorten Url' } })
})

app.use('/url', require('./routes/urls'))
app.use('', require('./routes/index'))

// Connect Database
connectDatabase.connect()

const PORT = 5000

app.listen(process.env.PORT || 5000, () => console.log("Listening to the port 5000"))

module.exports = app