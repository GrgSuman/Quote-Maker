const express = require('express')
const {listTemplates,getQuote} = require("../controller/quoteMakerController")

const router = express.Router()


router.post("/sendQuote",getQuote)


module.exports=router