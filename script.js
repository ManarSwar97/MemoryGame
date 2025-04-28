const cards = document.querySelectorAll('.img');
let divs = [];
let imgFronts = [];
let imgBacks = [];
let score = 0;

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

const image1Copy = [...images.image1];
const image2Copy = [...images.image2];
const imagess = [];

const imageFunction = () => {
    for (let i = 0; i < 12; i++) {
        const randomIndex1 = Math.floor(Math.random() * image1Copy.length);
        const randomIndex2 = Math.floor(Math.random() * image2Copy.length);

        const randomImage1 = image1Copy[randomIndex1];
        const randomImage2 = image2Copy[randomIndex2];

        imagess.push(randomImage1);
        imagess.push(randomImage2);

        image1Copy.splice(randomIndex1, 1);
        image2Copy.splice(randomIndex2, 1);
    }
    return imagess;
};

const result = imageFunction();
console.log(result);

const displayImages = () => {
    imagess.forEach((image, index) => {
        const div = document.createElement('div');
        div.classList.add('image-container');

        const imgFront = document.createElement('img');
        imgFront.src = image.src;
        imgFront.style.width = '100px';
        imgFront.style.opacity = '0';

        const imgBack = document.createElement('img');
        imgBack.src = "figma/back.png";
        imgBack.style.width = '100px';
        imgBack.style.opacity = '1';

        div.appendChild(imgFront);
        div.appendChild(imgBack);
        
        if (cards[index]) {
            cards[index].appendChild(div);
        }

        divs.push(div);
        imgFronts.push(imgFront);
        imgBacks.push(imgBack);

    });
};
const winning = () => {
    let opened = [];

    for (let i = 0; i < divs.length; i++) {
        if (imgFronts[i].style.opacity === '1') {
            opened.push(i);
        }
    }

    if (opened.length <= 2) {
        for (let i = 0; i < opened.length; i++) {
            for (let j = i + 1; j < opened.length; j++) {
                const firstIndex = opened[i];
                const secondIndex = opened[j];

                if (imagess[firstIndex].name === imagess[secondIndex].name) {
                    imgFronts[firstIndex].style.opacity = '1';
                    imgBacks[firstIndex].style.opacity = '0';
                    imgFronts[secondIndex].style.opacity = '1';
                    imgBacks[secondIndex].style.opacity = '0';
                    break
                } else {
                    setTimeout(() => {
                        imgFronts[firstIndex].style.opacity = '0';
                        imgBacks[firstIndex].style.opacity = '1';
                        imgFronts[secondIndex].style.opacity = '0';
                        imgBacks[secondIndex].style.opacity = '1';
                    }, 500);
                    
                }
            }
        }
    }
};


displayImages();

divs.forEach((div, index) => {
    div.addEventListener('click', () => {
        imgFronts[index].style.opacity = '1';
        imgBacks[index].style.opacity = '0';
        winning(); 
    });
});

