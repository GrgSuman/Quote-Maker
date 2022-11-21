
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

module.exports={
    listTemplates,
    getQuote
}