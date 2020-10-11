const mongoose = require ('mongoose')
const Schema = mongoose.Schema
const userSchema = new Schema({
    email: String,
    password: String,
    rolename: String
})

module .exports= mongoose.model('user',userSchema,'users')
//here user--api  ,,,userschema-schema  ,users-db collection name