const {getFontsList} = require("../../../utils/getFonts")
const {QuoteTemplate} = require("../../quote-maker/model/QuoteTemplate")
const asyncHandler = require("express-async-handler")


//@desc Admin Dashboard Showcase
//@GET admin/home
//@access private 
const dashboard = (req,res)=>{
    const data={
        "page":"home"
    }
    res.render("pages/admin/dashboard.ejs",data)
}

//@desc Admin All Quote Templates Showcase View Page
//@GET admin/manage-quote-templates
//@access private 
const quoteTemplates = async(req,res)=>{

    const templates = await QuoteTemplate.find()
    const data={
        "page":"quoteTemplates",
        "templates":templates
    }
    res.render("pages/admin/quoteTemplate.ejs",data)
}

//@desc Add New Quote Template View Page
//@POST admin/manage-quote-templates/add
//@access private 
const quoteTemplateAdd = async(req,res)=>{
    const data={
        "page":"quoteTemplates",
        "fonts": await getFontsList()
    }
    res.render("pages/admin/quoteTemplateAdd.ejs",data)
}

//@desc Quote Template Update and Delete View Page
//@GET admin/manage-quote-templates/:id
//@access private 
const quoteTemplateUpdateDelete = asyncHandler (async(req,res)=>{
    const template = await QuoteTemplate.findById(req.params.id)
    const data={
        "page":"quoteTemplates",
        "fonts": await getFontsList(),
        "template":template
    }
    res.render("pages/admin/quoteTemplateUpdateDelete.ejs",data)
})

//@desc Lists All Blogs
//@GET admin/manage-blogs
//@access private 
const blogs = (req,res)=>{
    const data={
        "page":"blogs"
    }
    res.render("pages/admin/blog.ejs",data)
}

//@desc Lists All Users
//@GET admin/manage-users
//@access private 
const users = (req,res)=>{
    const data={
        "page":"users"
    }
    res.render("pages/admin/user.ejs",data)
}

//@desc Lists All Email Subscribers
//@GET admin/email-subscribers
//@access private 
const emailSubscribers = (req,res)=>{
    const data={
        "page":"emailSubscribers"
    }
    res.render("pages/admin/emailSubscriber.ejs",data)
}

module.exports={
    dashboard,
    quoteTemplates,
    quoteTemplateAdd,
    quoteTemplateUpdateDelete,
    blogs,
    users,
    emailSubscribers,
}