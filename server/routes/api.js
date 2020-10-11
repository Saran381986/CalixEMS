// all our api endpoints are mentioned here
const express = require ('express')
const jwt = require('jsonwebtoken')
const router = express.Router()
const mongoose = require('mongoose')
const User = require('../models/user')
const Device = require('../models/device')
const Mapsview = require('../models/map')
const { resolveSoa } = require('dns')

//connection string
const db="mongodb+srv://calixuser:calixuserpwd@clustercalixems.uoc6g.mongodb.net/calixuser"

mongoose.connect(db,err=>{
    if (err){
        console.error('Error!'+ err)
    }else{
        console.log('connected to mongodb')
    }
})

// get request from api
router.get('/',(req,res)=>{
    res.send('From API route')
})



//USER REGISTRATION API
router.post('/register', (req,res) => {
    let userData = req.body   //extract the userdata from user entry then interact the model that mongoose can understand
    let user = new User(userData)


    //save data TO DATABASE
    user.save((error, registeredUser) => {
        if(error){
            console.log(error)
        }else{
            

            //here generate the token in server(jwt), 
            //create an payload for token

            let payload = {subject:registeredUser._id}
            //sign the token and generated
            let token = jwt.sign(payload,'secretkey')     //'secretkey'-it could be any string u wish to give
            res.status(200).send({token})
            console.log(registeredUser)
        }
    })
})




//DEVICE CONFIG API
router.post('/device', (req,res) => {
let deviceData =req.body
let device = new Device(deviceData)

//save data to database
device.save((error, deviceconfig) => {
    if (error){
        console.log(error)
        }else{
            res.status(200).send(deviceconfig)
        }
})
})

//MAPS API
router.post('/map',(req , res) => {
    let mapData = req.body
    let maps = new Mapsview(mapData)
    
    //save data to database
    maps.save((error,mapsview )=> {
        if(error){
        console.log(error)
    }else{
        res.status(200).send(mapsview)
    }
    })
    
    
})

//GET DEVICE VIEW FROM DB and also verify the token presence(verifyToken method --middleware checking)
router.get('/device',verifyToken,(req,res) => {
    let deviceData = req.body

    Device.find({},(error,devices)=>{
        if(error){
            console.log(error)
        }else{
            // res.json(device)
            res.status(200).send(devices)
        }
    })
})

//GET MAPS -VIEW FROM DB
router.get('/map',(req,res) => {
    let mapData = req.body

    // Mapsview.findOne({companyName : mapData.companyName}, (error, maps)=>{
    Mapsview.find({},(error, maps)=>{    
    if(error){
            console.log(error)
        }else{
            res.status(200).send(maps)
        }
    })
})

//LOGIN API
router.post('/login', (req, res) => {
    let userData = req.body

    User.findOne({email : userData.email}, (error, user) =>{
        if(error){
            console.log(error)
        }else{
            if(user.email !== userData.email){
                res.status(401).send('Invalid email')
            }else{
                if(user.password !== userData.password ){
                    res.status(401).send("Incorrect Password")
                }else{
                    if(user.rolename !== userData.rolename){
                        res.status(401).send("Inavlid Rolename")
                    }else{
                        let payload={subject: user._id}
                        let token = jwt.sign(payload, 'secrerkey')
                        res.status(200).send({token})

                        
                    }
                }
            }
        }
    })
})

//Middleware to verify the token
function verifyToken(req, res, next){
if(!req.headers.autherization){
    return res.status(401).send('unauthorized request')

}
let token = req.headers.authorization.split(' ')[1]
if(token ==='null'){
    return res.status(401).send('unauthorized request')
}
let payload=jwt.verify(token, 'secretKey')
if(!payload){
    return res.status(401).send('unauthorized request')
}
req.userId = payload.subject
next()
}






module.exports = router