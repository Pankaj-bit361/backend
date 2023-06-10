const mongoose=require("mongoose")

let EmiSchema=mongoose.Schema({
    "amount":{type:Number,required:true},
    "interest":{type:Number,required:true},
    "months":{type:Number,required:true}
},{
    versionKey:false
})

const EmiModel=mongoose.model("emi",EmiSchema)

module.exports={
    EmiModel
}
