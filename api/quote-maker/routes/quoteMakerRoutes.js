const express = require('express')
const {listTemplates,getQuote,canvasImage} = require("../controller/quoteMakerController")

const router = express.Router()


router.post("/sendQuote",getQuote)
router.post("/getImageData",canvasImage)

module.exports=router