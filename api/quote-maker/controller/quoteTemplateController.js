const {QuoteTemplate} = require("../model/QuoteTemplate")
const asyncHandler = require("express-async-handler");

const getAllQuoteTemplates = async(req,res)=>{

    const templates = await QuoteTemplate.find().limit(5)
    
    const data={
        data:templates
    }
    res.json(data)
}

const getSingleQuoteTemplate = async(req,res)=>{
    const data={
        msg:"single templates of quote"
    }
    res.json(data)
}


//@desc add the quote template
//@PUT templates/
//@access private 
const addQuoteTemplate = async(req,res)=>{
    
    const obj = JSON.parse(req.body.imgData)

    if(req.file?.filename){
        obj.templateDetails.featuredImage = req.file.filename
    }

    const data = await QuoteTemplate.create(obj)

    res.json(data);
}

//@desc updates the quote template
//@PUT templates/:id
//@access private 
const updateQuoteTemplate = async(req,res)=>{

    const obj = JSON.parse(req.body.imgData)

    if(req.file?.filename){
        obj.templateDetails.featuredImage = req.file.filename
    }else{
        obj.templateDetails.featuredImage = req.body.previousFeaturedImage
    }
    const data = await QuoteTemplate.updateOne({_id:req.params.id},obj)

    res.json(data)
}

//@desc delete the quote template
//@DELETE templates/:id
//@access private 
const deleteQuoteTemplate = async(req,res)=>{

    await QuoteTemplate.findByIdAndDelete(req.params.id)
    const data = {
        msg:"success"
    }
    res.json(data)
}



module.exports={
    getAllQuoteTemplates,
    getSingleQuoteTemplate,
    addQuoteTemplate,
    updateQuoteTemplate,
    deleteQuoteTemplate
}