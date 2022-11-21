require('dotenv').config();
const express = require('express');
const { createCanvas, loadImage } = require('canvas')
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

const templateData = {

    canvasHeight:700,
    canvasWidth:630,

    imageFit:{
        canvasAsImageSize:true,
        autoAdjustCanvasToImage:false,
        ImageAsCanvasSize:false
    },

    imgURL:"https://images.unsplash.com/photo-1542378151504-0361b8ec8f93?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",

    quote:"How to add shadows to your Canvas Elements? In this lesson we learn how to add shadows to our lessons.",
    quoteColor:"white",

    quoteFontSize:25,
    quoteXPosition:10,
    quoteYPosition:20,
    quoteWidth:50,

    author:"Suman Gurung",
    authorColor:"white",
    authorFontSize:20,
    authorXPosition:60,
    authorYPosition:80,
    authorWidth:50,
}


app.get("/",async (req,res)=>{
    const data={
        name:"Suman Gurung"
    }

    function wrapText(ctx, text, x, y, maxWidth, lineHeight) {
        var words = text.split(' ');
        var line = '';
    
        for(var n = 0; n < words.length; n++) {
          var testLine = line + words[n] + ' ';
          var metrics = ctx.measureText(testLine);
          var testWidth = metrics.width;
          if (testWidth > maxWidth && n > 0) {
            ctx.fillText(line, x, y);
            line = words[n] + ' ';
            y += lineHeight;
          }
          else {
            line = testLine;
          }
        }
        ctx.fillText(line, x, y);
    }

    const canvas = createCanvas(templateData.canvasWidth,templateData.canvasHeight)
    const ctx = canvas.getContext('2d')



    const myimg = await loadImage(templateData.imgURL)

    if(myimg.height<canvas.height && myimg.width<canvas.width){
        canvas.height= myimg.height
        canvas.width= myimg.width
    }

    var ratio = myimg.height / myimg.width;
    canvas.height = canvas.width * ratio
    ctx.drawImage(myimg, 0,0, canvas.width, canvas.height); 

    // ctx.drawImage(myimg, 0, 0, myimg.width, myimg.height, 0, 0, canvas.width, canvas.height);


    //text 1 properties
    var maxWidth = templateData.quoteWidth * 0.01 * canvas.width;
    var lineHeight = templateData.quoteFontSize + 5;
    var x = templateData.quoteXPosition*0.01*canvas.width;
    var y = templateData.quoteYPosition*0.01*canvas.height;
    var text = templateData.quote;
    ctx.font = `normal 600 ${templateData.quoteFontSize}px monospace`;
    ctx.fillStyle = templateData.quoteColor

    wrapText(ctx, text, x, y, maxWidth, lineHeight);

    //text 2 properties
    var maxWidth = templateData.authorWidth *0.01 * canvas.width;
    var lineHeight = templateData.authorFontSize + 5;
    var x = templateData.authorXPosition*0.01*canvas.width;
    var y = templateData.authorYPosition*0.01*canvas.height;
    var text = templateData.author;

    ctx.font = `normal 600 ${templateData.authorFontSize}px monospace`;
    ctx.fillStyle = templateData.authorColor

    wrapText(ctx, text, x, y, maxWidth, lineHeight);

    data['image']=canvas.toDataURL('image/png', 1)
    
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
