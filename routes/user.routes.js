
const express = require("express")
const { UserModel } = require("../models/user.model")
const bcrypt = require("bcrypt")
const UserRoute = express.Router()
const jwt=require("jsonwebtoken")


UserRoute.post("/register", async (req, res) => {
    const { email, password, name } = req.body

    let findout = await UserModel.findOne({ email })

    if (findout) {
        res.send({ "msg": "user already exists" })
    } else {
        bcrypt.hash(password, 5, async (err, hash) => {
            if (hash) {
                let newuser = new UserModel({ email, password: hash, name })
                await newuser.save()
                res.send({ "msg": "user successfully registered" })
            } else {
                res.send({ "msg": err.message })
            }
        })
    }


})


UserRoute.post("/login", async (req, res) => {
    const { email, password } = req.body
    let findout = await UserModel.findOne({ email })

    if (findout) {
      bcrypt.compare(password,findout.password,(err,hashed)=>{
        if(hashed){
            jwt.sign({UserId:findout._id},"masai",(err,token)=>{
                if(token){
                    res.send({"msg":"login Successfully",token})
                }else{
                    res.send({"err":err.message})
                }
            })
        }else{
            res.send({"msg":"please check the password"})
        }
      })
    }else{
        res.send({"msg":"please register first"})
    }


})



UserRoute.get("/",async(req,res)=>{
    try {
        let findout=await UserModel.find()
        res.send(findout)
    } catch (error) {
        res.send({"msg":error.message})
    }
})

module.exports = {
    UserRoute
}