const mongoose = require('mongoose');

const QuoteTemplateSchema = mongoose.Schema({
    
    canvasDetails:{
        height: {
            type:Number,
            default:700
        },
        width:{
            type:Number,
            default:630
        },
        bgColor:{
            type:String,
            default:"#000000"
        },
        bgImageURL:{
            type:String,
            default:"https://images.unsplash.com/photo-1510936111840-65e151ad71bb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1190&q=80"
        },
        useImageForBG:{
            type:Boolean,
            default:false
        },
        imageFit:{
            type:String,
            enum:["canvasAsImageSize","autoAdjust","ImageAsCanvasSize"],
            default:"autoAdjust"
        }
    },
    quoteDetails:{
        quote:String,
        quoteColor: {
            type:String,
            default:"white"
        },
        quoteFontFamily: {
            type:String,
            default:"white"
        },
        quoteFontSize:{
            type:Number,
            default:25
        },
        quoteXPosition:{
            type:Number,
            default:10
        },
        quoteYPosition:{
            type:Number,
            default:20
        },
        quoteWidth:{
            type:Number,
            default:50
        }
    },
    authorDetails:{
        author:String,
        authorColor: {
            type:String,
            default:"white"
        },
        authorFontFamily: {
            type:String,
            default:"white"
        },
        authorFontSize:{
            type:Number,
            default:20
        },
        authorXPosition:{
            type:Number,
            default:60
        },
        authorYPosition:{
            type:Number,
            default:80
        },
        authorWidth:{
            type:Number,
            default:50
        }
    },
    templateDetails:{
        featuredImage:String
    }
})

const QuoteTemplate = mongoose.model('QuoteTemplate',QuoteTemplateSchema)

module.exports={
    QuoteTemplate
}