require('dotenv').config();
const express = require('express');
const logger = require('morgan');
const cors = require('cors')
const app = express();

app.use(logger('dev'));
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cors())

app.set('view engine','ejs');
app.use('/public',express.static('public'));

require('./config/dbConfig')
const {errorHandler} = require("./middleware/errorHandler.js")

//importing routes
const authRoutes = require('./api/auth/routes/authRoutes.js')
const adminRoutes = require('./api/auth/routes/adminRoutes.js')
const quoteMakerRoutes = require("./api/quote-maker/routes/quoteMakerRoutes")

//implementing routes
//auth
app.use('/api/user',authRoutes)

//admin
app.use('/admin',adminRoutes)

//quote Maker
app.use('/api',quoteMakerRoutes)

app.get('/login/admin')

const {canvasImageData} = require("./utils/canvasImage");
const { createImageData } = require('canvas');


//index page
app.get("/",async (req,res)=>{
    const data={
        name:"Suman Gurung",
    }


    res.render("pages/index.ejs",data)
})

//error 404
app.use("/*",(req,res)=>{
    res.status(404).json({"msg":"Error: Not Found"})
})

app.use(errorHandler)

const port = process.env.PORT || 8000;

app.listen(port,()=>{
    console.log(`Server is running on portt ${port}`);
})
