const express = require('express')
const {canvasImage,singleQuoteMaker} = require("../controller/quoteMakerController")

const router = express.Router()

router.get("/quote-maker/",singleQuoteMaker)
router.post("/getImageData",canvasImage)

module.exports=router