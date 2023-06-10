const express=require("express")
const { EmiModel } = require("../models/emi.model")

const EmiRoute=express.Router()



EmiRoute.post("/add",async(req,res)=>{

try {
    let newemi=new EmiModel(req.body)
    await newemi.save()
    res.send({"msg":"successfully added"})
} catch (error) {
    res.send({"err":error.message})
}

})

EmiRoute.get("/",async(req,res)=>{

    try {
        let newemi=await EmiModel.find()   
        res.send(newemi)
    } catch (error) {
        res.send({"err":error.message})
    }
    
    })
    EmiRoute.patch("/:id",async(req,res)=>{
       const {id}=req.params
        try {
            let newemi=await EmiModel.findByIdAndUpdate({_id:id},req.body)   
            res.send(newemi)
        } catch (error) {
            res.send({"err":error.message})
        }
        
        })
    





module.exports={
    EmiRoute
}