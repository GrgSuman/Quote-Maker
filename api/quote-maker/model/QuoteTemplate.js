const mongoose = require('mongoose');

const QuoteTemplateSchema = mongoose.Schema({
    
    canvasDetail:{
        height: Number,
        width:Number,
        bgColor:{
            type:String,
            default:"#000000"
        },
        bgImageURL:String,
        useImageForBG:Boolean,
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
        authorFontSize:{
            type:Number,
            default:25
        },
        authorXPosition:{
            type:Number,
            default:10
        },
        authorYPosition:{
            type:Number,
            default:20
        },
        authorWidth:{
            type:Number,
            default:50
        }
    }
})

const QuoteTemplate = mongoose.model('QuoteTemplate',QuoteTemplateSchema)

module.exports={
    QuoteTemplate
}