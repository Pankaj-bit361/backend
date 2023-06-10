const express=require("express")
const { connection } = require("./db")
const { UserRoute } = require("./routes/user.routes")
const { EmiRoute } = require("./routes/emi.routes")
const cors=require("cors")

const app=express()
app.use(cors())
app.use(express.json())

app.get("/",(req,res)=>{
    res.send("hello connected ")
})

app.use("/users",UserRoute)
app.use("/emi",EmiRoute)

app.listen(process.env.port,async()=>{
    try {
        await connection
        console.log("connected to the db")
    } catch (error) {
     console.log(error)   
    }

    console.log("connected to the port")
})
