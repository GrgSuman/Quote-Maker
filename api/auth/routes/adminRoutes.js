const express = require('express')
const {dashboard,quoteTemplates,quoteTemplateAdd,quoteTemplateUpdateDelete,blogs,users,emailSubscribers} = require("../controller/adminController")

const router = express.Router()

router.get('/home',dashboard)
router.get('/manage-quote-templates',quoteTemplates)
router.get('/manage-quote-templates/add',quoteTemplateAdd)
router.get('/manage-quote-templates/:id',quoteTemplateUpdateDelete),
router.get('/manage-users',users)
router.get('/manage-blogs',blogs)
router.get('/email-subscribers',emailSubscribers)

module.exports = router