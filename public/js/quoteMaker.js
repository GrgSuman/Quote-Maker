
var quoteData = JSON.parse(window.localStorage.getItem("quoteData"))
if(!quoteData){
    const quoteData = {
        quote:'"If you are not willing to risk the usual, you will have to settle for the ordinary."',
        author:"- Jim Rohn"  
    }
    window.localStorage.setItem("quoteData",JSON.stringify(quoteData))
}

document.querySelector(".myquote_").textContent=quoteData.quote
document.querySelector(".author").textContent=quoteData.author

const getImageDetails=async(imgDetails)=>{
    startLoading()
    const res = await fetch("/templates/customSingleTemplate",{
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body:JSON.stringify(imgDetails)
    })
    const data = await res.json()
    stopLoading()
    return  data?.templateData
}

const canvasImageData = (data)=>{

const canvas = document.getElementById("canvas")
const ctx = canvas.getContext('2d')

canvas.height = data.canvasDetails.height
canvas.width = data.canvasDetails.width

ctx.fillStyle = data.canvasDetails.bgColor;
ctx.fillRect(0, 0, canvas.width, canvas.height);

if(data.canvasDetails.useImageForBG){

    let myimg = new Image();
    myimg.crossOrigin = 'Anonymous'
    myimg.src = data.canvasDetails.bgImageURL

    myimg.onload = function () {

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
    ctx.fillStyle = data.quoteDetails.quoteColor

    wrapText(ctx, textQ, xQ, yQ, maxWidthQ, lineHeightQ);

    //text 2 properties
    var maxWidth = data.authorDetails.authorWidth *0.01 * canvas.width;
    var lineHeight = data.authorDetails.authorFontSize + 5;
    var x = data.authorDetails.authorXPosition*0.01*canvas.width;
    var y = data.authorDetails.authorYPosition*0.01*canvas.height;
    var text = data.authorDetails.author;
    ctx.font = `${data.authorDetails.authorFontSize}px ${data.authorDetails.authorFontFamily}`;
    ctx.fillStyle = data.authorDetails.authorColor

    wrapText(ctx, text, x, y, maxWidth, lineHeight);

    document.getElementById("result_").src = canvas.toDataURL('image/png');
}
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
    ctx.fillStyle = data.authorDetails.authorColor

    wrapText(ctx, text, x, y, maxWidth, lineHeight);

    document.getElementById("result_").src = canvas.toDataURL('image/png',1);
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

//loading fonts
const fonts = "<%= fonts %>"
let fontsArray = fonts.split(',');
const fontsForUse = fontsArray.map((x)=>{
    return x.replace(/\.[^\/.]+$/, '')
})

fontsArray.forEach((value,index)=>{
        let x = new FontFace(fontsForUse[index], `url(../fonts/${value})`);
        x.load().then((font) => {
        document.fonts.add(font);
        
    });
})

window.addEventListener('load',async function() {
    canvasImageData(await getImageDetails(quoteData))
})

const templateOptions = document.querySelectorAll(".others_")
templateOptions.forEach((x)=>{
    x.addEventListener('click',async()=>{
       const templateId = x.getAttribute("data-id")
       quoteData['id'] = templateId
       canvasImageData(await getImageDetails(quoteData))
    })
})
