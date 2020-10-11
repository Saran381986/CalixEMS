const mongoose = require ('mongoose')
const Schema = mongoose.Schema
const deviceSchema = new Schema({
    deviceType: String,
    modelNo: String,
    modelName: String,
    capacity:String
})

module .exports= mongoose.model('device',deviceSchema,'device')
//here user--api  ,,,userschema-schema  