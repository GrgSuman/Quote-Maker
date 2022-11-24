const { createCanvas, loadImage, registerFont } = require('canvas')
const {getFontsList} = require("./getFonts")

// const data = {
//     canvasDetails:{
//         height:700,
//         width:630,
//         bgColor:"black",
//         bgImageURL:"https://images.unsplash.com/photo-1542378151504-0361b8ec8f93?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
//         useBGForImage:true,
//         imageFit:"autoAdjust"
//     },
//     quoteDetails:{
//         quote:"How to add shadows to your Canvas Elements? In this lesson we learn how to add shadows to our lessons.",
//         quoteColor:"white",
//         quoteFontSize:30,
//         quoteFontFamily:"Righteous-Regular",
//         quoteXPosition:10,
//         quoteYPosition:20,
//         quoteWidth:50
//     },
//     authorDetails:{
//         author:"Suman Gurung",
//         authorColor:"white",
//         authorFontSize:20,
//         authorFontFamily:"Righteous-Regular",
//         authorXPosition:60,
//         authorYPosition:80,
//         authorWidth:50
//     }
// }

const canvasImageData = async(data)=>{

    const fonts = await getFontsList()
    
    fonts.forEach((x)=>{
        registerFont(`./public/fonts/${x}`, {family: x.replace(/\.[^\/.]+$/, '')})
    })

    const canvas = createCanvas(data.canvasDetails.width,data.canvasDetails.height)
    const ctx = canvas.getContext('2d')

    ctx.fillStyle = data.canvasDetails.bgColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    if(data.canvasDetails.useBGForImage){
        const myimg = await loadImage(data.canvasDetails.bgImageURL)

        if(data.canvasDetails.imageFit=="autoAdjust"){
            if(myimg.height<canvas.height && myimg.width<canvas.width){
                canvas.height= myimg.height
                canvas.width= myimg.width
            }
            var ratio = myimg.height / myimg.width;
            canvas.height = canvas.width * ratio
            ctx.drawImage(myimg, 0,0, canvas.width, canvas.height); 
        }

        if(data.canvasDetails.imageFit=="canvasAsImageSize"){
            canvas.height= myimg.height
            canvas.width= myimg.width
            ctx.drawImage(myimg, 0,0, canvas.width, canvas.height); 
        }

        if(data.canvasDetails.imageFit=="ImageAsCanvasSize"){
            ctx.drawImage(myimg, 0, 0, myimg.width, myimg.height, 0, 0, canvas.width, canvas.height);
        }

        //text 1 properties
        var maxWidthQ = data.quoteDetails.quoteWidth * 0.01 * canvas.width;
        var lineHeightQ = data.quoteDetails.quoteFontSize + 5;
        var xQ = data.quoteDetails.quoteXPosition*0.01*canvas.width;
        var yQ = data.quoteDetails.quoteYPosition*0.01*canvas.height;
        var textQ = data.quoteDetails.quote;
        ctx.font = `${data.quoteDetails.quoteFontSize}px ${data.quoteDetails.quoteFontFamily}`;
        // ctx.font = '26px "Orbitron"'
        ctx.fillStyle = data.quoteDetails.quoteColor

        wrapText(ctx, textQ, xQ, yQ, maxWidthQ, lineHeightQ);

        //text 2 properties
        var maxWidth = data.authorDetails.authorWidth *0.01 * canvas.width;
        var lineHeight = data.authorDetails.authorFontSize + 5;
        var x = data.authorDetails.authorXPosition*0.01*canvas.width;
        var y = data.authorDetails.authorYPosition*0.01*canvas.height;
        var text = data.authorDetails.author;
        ctx.font = `${data.authorDetails.authorFontSize}px ${data.authorDetails.authorFontFamily}`;

        ctx.fillStyle = data.authorColor

        wrapText(ctx, text, x, y, maxWidth, lineHeight);

        const imgData =  canvas.toDataURL('image/png', 1);
        return  imgData
    }
    else{
        //text 1 properties
        var maxWidthQ = data.quoteDetails.quoteWidth * 0.01 * canvas.width;
        var lineHeightQ = data.quoteDetails.quoteFontSize + 5;
        var xQ = data.quoteDetails.quoteXPosition*0.01*canvas.width;
        var yQ = data.quoteDetails.quoteYPosition*0.01*canvas.height;
        var textQ = data.quoteDetails.quote;
        ctx.font = `${data.quoteDetails.quoteFontSize}px ${data.quoteDetails.quoteFontFamily}`;
        ctx.fillStyle = data.quoteDetails.quoteColor

        wrapText(ctx, textQ, xQ, yQ, maxWidthQ, lineHeightQ);

        //text 2 properties
        var maxWidth = data.authorDetails.authorWidth *0.01 * canvas.width;
        var lineHeight = data.authorDetails.authorFontSize + 5;
        var x = data.authorDetails.authorXPosition*0.01*canvas.width;
        var y = data.authorDetails.authorYPosition*0.01*canvas.height;
        var text = data.authorDetails.author;
        ctx.font = `${data.authorDetails.authorFontSize}px ${data.authorDetails.authorFontFamily}`;

        ctx.fillStyle = data.authorColor

        wrapText(ctx, text, x, y, maxWidth, lineHeight);

        const imgData =  canvas.toDataURL('image/png', 1);
        return  imgData
    }


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

module.exports = {
    canvasImageData
}