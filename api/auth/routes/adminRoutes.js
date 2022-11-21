const express = require('express')
const {dashboard,quoteTemplates,quoteTemplateAdd,blogs,users,emailSubscribers} = require("../controller/adminController")

const router = express.Router()

router.get('/home',dashboard)
router.get('/manage-quote-templates',quoteTemplates)
router.get('/manage-quote-templates/add',quoteTemplateAdd)
router.get('/manage-users',users)
router.get('/manage-blogs',blogs)
router.get('/email-subscribers',emailSubscribers)

module.exports = router