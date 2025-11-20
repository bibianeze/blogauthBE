require("dotenv").config()
const express = require('express')
const app = express()
const PORT = process.env.PORT || 1000
const mongoose = require("mongoose")
const authRouter = require("./routes/authRouter")
const auth = require("./middleware/authentication")
const blogRouter = require("./routes/blogRouter")
const notfound = require("./utils/notfound")




app.use(express.json())
app.use("/api/v1", authRouter)
app.use("/api/v1/blog", auth, blogRouter)
app.get("/", (req, res)=>{
    res.status(200).json({success:true, message: "server is live"})
})
app.use(notfound)
app.get("/test", auth, (req, res)=>{
    res.send("passed authenticatiom")
})
const start = async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI)
        app.listen(PORT, ()=>{
            console.log(`server running on port ${PORT}`);
            
        })
    } catch (error) {
        console.log(error);
        
    }
}
start()