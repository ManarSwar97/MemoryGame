const cards = document.querySelectorAll('.img')

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
        { src: "figma/img100.png", name: "flower10" },
        { src: "figma/img110.png", name: "flower11" },
        { src: "figma/img120.png", name: "flower12" }
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
        { src: "figma/img100.png", name: "flower10" },
        { src: "figma/img110.png", name: "flower11" },
        { src: "figma/img120.png", name: "flower12" }
    ]
};

const image1Copy = [...images.image1]
const image2Copy = [...images.image2]
const imagess = []

const imageFunction = () => {
    for (let i = 0; i < 12; i++) {
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

const result = imageFunction()
console.log(result)

const displayImages = () => {
    imagess.forEach((image, index) => {
        const div = document.createElement('div')
        div.classList.add('image-container')

        const imgElement = document.createElement('img')
        imgElement.setAttribute('class', 'front')
        imgElement.src = image.src
        imgElement.style.width = '100px'
        imgElement.style.opacity = '0'

        const imgElement2 = document.createElement('img')
        imgElement2.setAttribute('class', 'back')
        imgElement2.src = "figma/back.png"
        imgElement2.style.width = '100px'
        imgElement2.style.opacity = '1'

        div.appendChild(imgElement)
        div.appendChild(imgElement2)

        div.addEventListener('click', () => {
            imgElement.style.opacity = '1'
            imgElement2.style.opacity = '0'
        })

        if (cards[index]) {
            cards[index].appendChild(div)
        }
    })
}
displayImages()
