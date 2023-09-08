
const createModel = require("../models/create")
const cloudinary = require("../utils/cloudinary")
const createMusic  = async(req,res)=> {
    const {name,singer,image,video} = req.body
    try {
       if(!name || !singer || !image|| !video) return res.status(400).json("All field are require")
       const uploadImageResponse = await cloudinary.uploader.upload(image,{
           upload_preset:"music-list"
       })
       const uploadVideoResponse = await cloudinary.uploader.upload(video,{
        resource_type: "video" , 
         chunk_size: 6000000 ,
          upload_preset:"music-list",
         
       })
       data = new createModel({
           name,
           singer,
           image:uploadImageResponse,
           video:uploadVideoResponse
       })
       await data.save()
       res.status(200).json(data)
    
    }catch(err){
        console.log(err)
        res.status(500).json(err)
    }
}
const getAllMusic = async(req,res)=> {
    try {
        const response = await createModel.find()
        res.status(200).json(response)
    }catch(err){
        console.log(err)
        res.status(500).json(err)
    }
}
module.exports = {createMusic,getAllMusic}