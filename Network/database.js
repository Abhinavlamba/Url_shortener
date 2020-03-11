const mongoose = require('mongoose')
const mongoURI = "mongodb+srv://Abhinav:abhinav@cluster0-xnzaz.mongodb.net/test?retryWrites=true&w=majority"

const connect = async() => {
    try {
        await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });
        console.log("Connected")
    } catch (error) {
        console.log(error.message)
    }
}
module.exports = {
    connect
}