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
    const{id} = req.body
    const template = await QuoteTemplate.findById({_id:id})
    const data={
        "templateData":template
    }
    res.json(data)
}

const getSingleQuoteTemplateWithCustomQuote = async(req,res)=>{

    const{quote,author,id} = req.body
    var template;
    if(!id){
        // id="63831f16b46438f84b3890df"
        const templates = await QuoteTemplate.find().limit(5)
        template = templates[0]

    }else{
        template = await QuoteTemplate.findById({_id:id})
    }

    template.quoteDetails.quote = quote
    template.authorDetails.author = author
    const data={
        "templateData":template
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
    deleteQuoteTemplate,
    getSingleQuoteTemplateWithCustomQuote
}