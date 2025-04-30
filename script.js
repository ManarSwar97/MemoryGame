//global variables sections
const scores = document.querySelector('.score2')
const cards = document.querySelectorAll('.img')
const resett = document.querySelector('.resett')
const timerDisplay = document.querySelector(".timer1")
const levelWinner = document.querySelector('.level-winner')

let timer
let divs = []
let imgFronts = []
let imgBacks = []
let score = 0
let opened = []
//music will play when the game start
let mySound = new Audio('Island.mp4')
let loseSound = new Audio('lose.mp4')
let winSound = new Audio('win.mp4')


mySound.play()
//I create an object with two arrays: the first array will have 10 images and the second array will have the same 10 images
const images = {
    image1: [
        { src: "figma/img11.png", name: "flower1" },
        { src: "figma/img22.png", name: "flower2" },
        { src: "figma/img33.png", name: "flower3" },
        { src: "figma/img44.png", name: "flower4" },
        { src: "figma/img55.png", name: "flower5" },
        { src: "figma/img66.png", name: "flower6" },
        { src: "figma/img77.png", name: "flower7" },
        { src: "figma/img88.png", name: "flower8" },
        { src: "figma/img99.png", name: "flower9" },
        { src: "figma/img100.png", name: "flower10" }
    ],
    image2: [
        { src: "figma/img11.png", name: "flower1" },
        { src: "figma/img22.png", name: "flower2" },
        { src: "figma/img33.png", name: "flower3" },
        { src: "figma/img44.png", name: "flower4" },
        { src: "figma/img55.png", name: "flower5" },
        { src: "figma/img66.png", name: "flower6" },
        { src: "figma/img77.png", name: "flower7" },
        { src: "figma/img88.png", name: "flower8" },
        { src: "figma/img99.png", name: "flower9" },
        { src: "figma/img100.png", name: "flower10" }

    ]
}
//Functions section
//create two copies of the two arrays to use them in randomizing without affecting the original arrays
const image1Copy = [...images.image1]
const image2Copy = [...images.image2]
//the randomized images and their indexes will be stored in this array
const imagess = []

//this function will be used to randomized the images from the two arrays and store them in the imagess array
const imageFunction = () => {
    for (let i = 0; i < 10; i++) {
        const randomIndex1 = Math.floor(Math.random() * image1Copy.length)
        const randomIndex2 = Math.floor(Math.random() * image2Copy.length)

        const randomImage1 = image1Copy[randomIndex1]
        const randomImage2 = image2Copy[randomIndex2]

        imagess.push(randomImage1)
        imagess.push(randomImage2)

        image1Copy.splice(randomIndex1, 1)
        image2Copy.splice(randomIndex2, 1)
    }
    return imagess
}

const result = imageFunction();
console.log(result)

//this function will be used to to set timer for 1:30 minute
const timerInterval = () =>{
    let timeLeft = 90     
    timer = setInterval(function() {
      timeLeft--
      let minutes = Math.floor(timeLeft / 60);
      let seconds = timeLeft % 60
      timerDisplay.textContent = minutes + ":" + String(seconds).padStart(2, "0")
    
      if (timeLeft <= 0) {
            mySound.pause()
            loseSound.play()
            clearInterval(timer)
            levelWinner.innerText=`Game Over`
            levelWinner.style.opacity="1"
            levelWinner.style.backgroundColor = "#000000"
        }
    }, 1000)
}
timerInterval()

//this function will be used to display images 
const displayImages = () => {
    imagess.forEach((image, index) => {
        const div = document.createElement('div')
        div.classList.add('image-container')

        const imgFront = document.createElement('img')
        imgFront.src = image.src
        imgFront.style.width = '100px'
        imgFront.style.opacity = '0'

        const imgBack = document.createElement('img')
        imgBack.src = "figma/back.png"
        imgBack.style.width = '100px'
        imgBack.style.opacity = '1'

        const disappear = () => {
        imgBack.style.opacity = '1' 
        imgFront.style.opacity = '0'  

        }
        const disappearing = setTimeout(disappear, 4000);
        imgFront.style.opacity = '1' 
        imgBack.style.opacity = '0'


        div.appendChild(imgFront)
        div.appendChild(imgBack)
        cards[index].appendChild(div)
        

        divs.push(div)
        imgFronts.push(imgFront)
        imgBacks.push(imgBack)
    })
}
//this function will check if the clicked images are same they'll display it, otherwise they'll disappear again 
const winning = () => {
    const [firstIndex, secondIndex] = opened

    if (imagess[firstIndex].name === imagess[secondIndex].name) {
        imgFronts[firstIndex].style.opacity = '1'
        imgBacks[firstIndex].style.opacity = '0'
        imgFronts[secondIndex].style.opacity = '1'
        imgBacks[secondIndex].style.opacity = '0'
        score += 10
        scores.innerText = score
        if(score >= 100){
            levelWinner.innerText=`You Win! Your Current Score is ${score}`
            levelWinner.style.opacity="1"
            levelWinner.style.backgroundColor = "#ee9ca7"  
            clearInterval(timer) 
            mySound.pause()
            winSound.play()
        }
        opened = []
    } else {
        setTimeout(() => {
            imgFronts[firstIndex].style.opacity = '0'
            imgBacks[firstIndex].style.opacity = '1'
            imgFronts[secondIndex].style.opacity = '0'
            imgBacks[secondIndex].style.opacity = '1'
            opened = []
        }, 500)
    }
}
//this function is going to reset the score, timer, and the images will be flipped again if the user click on the reset button
const reset = () =>{
    opened = []
    score = 0
    scores.innerText = score
    for(let i=0; i<imgFronts.length; i++){
        imgFronts[i].style.opacity = "0"
        imgBacks[i].style.opacity = "1"
    }
    clearInterval(timer)
    timerInterval()
    levelWinner.style.opacity = "0"
    mySound.play()
}

displayImages();

//addEventListeners section
divs.forEach((div, index) => {
    div.addEventListener('click', () => {
        if (opened.includes(index)) 
            return
        if (opened.length >= 2) 
            return

        imgFronts[index].style.opacity = '1'
        imgBacks[index].style.opacity = '0'
        opened.push(index)

        if (opened.length === 2) {
            winning()
        }

    })
})
resett.addEventListener('click', reset)


//funny-game-memory.surge.sh