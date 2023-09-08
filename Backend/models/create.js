const mongoose = require("mongoose")
const createSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minlength:1,
        maxlength:1024
    },
    singer: {
          type:String,
          required:true,
          minlength:1,
          maxlength:1024
    },
    image:{
        type:Object,
        required:true
    },
    video: {
       type:Object,
       required:true
    }
}, {
    timestamps:true
})
const createModel = mongoose.model("list-music",createSchema)
module.exports = createModel
