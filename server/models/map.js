const mongoose = require ('mongoose')
const Schema = mongoose.Schema
const mapSchema = new Schema({
    deviceType: String,
    companyName: String,
    location: String
    
})

module .exports= mongoose.model('map',mapSchema,'maps')
//here map--api  ,,,mapSchema-schema  ,maps-db collection