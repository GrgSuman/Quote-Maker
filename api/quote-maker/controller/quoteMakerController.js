const {canvasImageData} = require("../../../utils/canvasImage")
const {getFontsList} = require("../../../utils/getFonts")
const {QuoteTemplate} = require("../model/QuoteTemplate")


//@desc Returns quote template with user entered quote and author for specific id of template
//@GET quote/quote-maker/:id?q="dsas"&a="asd"
//@access public 
const singleQuoteMaker = async(req,res)=>{

    const quoteTemplates = await QuoteTemplate.find().limit(10)

    const data={
        "templates":quoteTemplates,
        "fonts": await getFontsList()
    }
    res.render("pages/quoteMaker.ejs",data)
}


//@desc Dynamic quote generation based on imageData
//@GET quote/getImageData
//@access public 
const canvasImage = async(req,res)=>{
    const imgData = await canvasImageData(req.body)
    const data={
        msg:"success",
        imageData:imgData
    }
    res.json(data)
}

module.exports={
    canvasImage,
    singleQuoteMaker
}