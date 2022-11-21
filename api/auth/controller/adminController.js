
const dashboard = (req,res)=>{
    const data={
        "page":"home"
    }
    res.render("pages/admin/dashboard.ejs",data)
}

const quoteTemplates = (req,res)=>{
    const data={
        "page":"quoteTemplates"
    }
    res.render("pages/admin/quoteTemplate.ejs",data)
}

const quoteTemplateAdd = (req,res)=>{
    const data={
        "page":"quoteTemplates"
    }
    res.render("pages/admin/quoteTemplateAdd.ejs",data)
}

const blogs = (req,res)=>{
    const data={
        "page":"blogs"
    }
    res.render("pages/admin/blog.ejs",data)
}

const users = (req,res)=>{
    const data={
        "page":"users"
    }
    res.render("pages/admin/user.ejs",data)
}

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
    blogs,
    users,
    emailSubscribers
}