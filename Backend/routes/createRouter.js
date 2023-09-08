const express = require("express")
const router = express.Router()
const {createMusic,getAllMusic} = require("../controllers/createController")
router.post("/music",createMusic)
router.get("/get/all",getAllMusic)
module.exports = router