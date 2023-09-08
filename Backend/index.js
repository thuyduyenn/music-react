const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const app = express()
const createRoute = require("./routes/createRouter")
require("dotenv").config()
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({ extended: false }))
app.use(cors());
app.get("/",(req,res)=> {
    res.send("Api connected in 5900")
})
app.use("/api/create",createRoute)
const port = process.env.PORT || 5900
const uri = process.env.DB_URL
app.listen(port,console.log(`Server running on port ${port}`))
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=> console.log("kết nối thành công")).catch((err)=> console.error(`Lỗi`,err))