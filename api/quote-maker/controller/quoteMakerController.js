const {canvasImageData} = require("../../../utils/canvasImage")

const listTemplates = (req,res)=>{
    res.json({"data":"all templates"})
}

const getQuote = (req,res)=>{
    console.log(req.body)
    const{quote,author} = req.body;
    if(!quote){
        throw new Error("Quote is required")
    }
    const data={
        quote,author
    }
    res.json({"suman":"asd"})
}

const canvasImage = async(req,res)=>{
    const imgData = await canvasImageData(req.body)
    const data={
        msg:"success",
        imageData:imgData
    }
    res.json(data)
}

module.exports={
    listTemplates,
    getQuote,
    canvasImage
}