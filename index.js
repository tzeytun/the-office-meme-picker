import { memesData } from '/data.js'

const emotionRadios = document.getElementById('emotion-radios')
const getImageBtn = document.getElementById('get-image-btn')
const gifsOnlyOption = document.getElementById('gifs-only-option')
const memeModalInner = document.getElementById('meme-modal-inner')
const memeModal = document.getElementById('meme-modal')
const memeModalCloseBtn = document.getElementById('meme-modal-close-btn')

emotionRadios.addEventListener('change', highlightCheckedOption)

memeModalCloseBtn.addEventListener('click', closeModal)

getImageBtn.addEventListener('click', renderMeme)

function highlightCheckedOption(e){
    
    const radios = document.getElementsByClassName('radio')
    for (let radio of radios){
        radio.classList.remove('highlight')
    }
    document.getElementById(e.target.id).parentElement.classList.add('highlight')
}

function closeModal(){
   
    memeModal.style.display = 'none'
}

function renderMeme(){
    
    const memeObject = getSingleMemeObject()
    memeModalInner.innerHTML =  `
        <img 
        class="meme-img" 
        src="./images/${memeObject.image}"
        alt="${memeObject.alt}"
        >
        `
    memeModal.style.display = 'flex'
}

function getSingleMemeObject(){
    
    const memesArray = getMatchingMemesArray()
    
    if(memesArray.length === 1){
        return memesArray[0]
    }
    else{
        const randomNumber = Math.floor(Math.random() * memesArray.length)
        return memesArray[randomNumber]
    }
}

function getMatchingMemesArray(){   
     
    if(document.querySelector('input[type="radio"]:checked')){
        const selectedEmotion = document.querySelector('input[type="radio"]:checked').value
        const isGif = gifsOnlyOption.checked
        
        const matchingMemesArray = memesData.filter(function(meme){
            
            if(isGif){
                return meme.emotionTags.includes(selectedEmotion) && meme.isGif
            }
            else{
                return meme.emotionTags.includes(selectedEmotion)
            }            
        })
        return matchingMemesArray 
    }  
}

function getEmotionsArray(memes){
    memeModal.style.display = 'none'
    const emotionsArray = []    
    for (let meme of memes){
        for (let emotion of meme.emotionTags){
            if (!emotionsArray.includes(emotion)){
                emotionsArray.push(emotion)
            }
        }
    }
    return emotionsArray
}

function renderEmotionsRadios(memes){
        
    let radioItems = ``
    const emotions = getEmotionsArray(memes)
    for (let emotion of emotions){
        radioItems += `
        <div class="radio">
            <label for="${emotion}">${emotion}</label>
            <input
            type="radio"
            id="${emotion}"
            value="${emotion}"
            name="emotions"
            >
        </div>`
    }
    emotionRadios.innerHTML = radioItems
}

renderEmotionsRadios(memesData)