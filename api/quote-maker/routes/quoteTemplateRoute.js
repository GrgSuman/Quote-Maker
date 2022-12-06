const express = require('express')
const {
    getAllQuoteTemplates,
    getSingleQuoteTemplate,
    addQuoteTemplate,
    updateQuoteTemplate,
    deleteQuoteTemplate,
    getSingleQuoteTemplateWithCustomQuote
} = require("../controller/quoteTemplateController")


const multer = require('multer');

const storage = multer.diskStorage({
  destination: function(req, file, callback) {
    callback(null, './public/uploads');
  },
  filename: function (req, file, callback) {
    callback(null, Date.now()+"_"+file.originalname);
  }
});

const upload = multer({storage: storage}).single("featuredImage")

const router = express.Router()


router.get(`/`,getAllQuoteTemplates)
      .post(`/`,upload,addQuoteTemplate)

router.get(`/:id`,getSingleQuoteTemplate)
      .put(`/:id`,upload,updateQuoteTemplate)
      .delete(`/:id`,deleteQuoteTemplate)

router.post('/customSingleTemplate',getSingleQuoteTemplateWithCustomQuote)

module.exports=router
