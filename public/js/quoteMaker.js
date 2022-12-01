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

const allTemplates = async ()=>{
   const res = await fetch("/templates")
   const data = await res.json()
   return data.data
}

const templateOptions = document.querySelectorAll(".others_")
templateOptions.forEach((x)=>{
    x.addEventListener('click',async()=>{
        const templateId = x.getAttribute("data-id")
        const templates = await allTemplates()
        let newTemplate = templates.filter((y)=>{
            return y._id==templateId
        })
        newTemplate[0].quoteDetails.quote=quoteData.quote
        newTemplate[0].authorDetails.author=quoteData.author
        getImageDetails(newTemplate[0])
    })
})

const firstSetTemplate=async()=>{
    const templateId = templateOptions[0].getAttribute("data-id")
    const templates = await allTemplates()
    let newTemplate = templates.filter((y)=>{
        return y._id==templateId
    })
    
    newTemplate[0].quoteDetails.quote=quoteData.quote
    newTemplate[0].authorDetails.author=quoteData.author
    getImageDetails(newTemplate[0])
}

firstSetTemplate()

const getImageDetails=async(imgDetails)=>{
    startLoading()
    const res = await fetch("/quote/getImageData",{
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body:JSON.stringify(imgDetails)
    })
    const data = await res.json()
    document.getElementById("result_").src=data.imageData
    stopLoading()
}

