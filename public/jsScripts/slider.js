const slides = document.querySelectorAll('.slide');  // this will be a nodelist
const dots = document.querySelectorAll('.dot');
const leftBtn = document.querySelector('#left');
const rightBtn = document.querySelector('#right');

let activeSlide = 0;
let activeDot = 0;

rightBtn.addEventListener('click', () => {
    activeSlide++;
    activeDot++;

    if (activeSlide > slides.length - 1) {
        activeSlide = 0;
        activeDot = 0;
    }
    if (activeDot > dots.length - 1) {
        activeSlide = 0;
        activeDot = 0;
    }

    setActiveSlide();
    setActiveDot();
})

leftBtn.addEventListener('click', () => {
    activeSlide--;
    activeDot--;

    if (activeSlide < 0) {
        activeSlide = slides.length - 1;
    }
    if (activeDot < 0) {
        activeDot = dots.length - 1;
    }

    setActiveSlide();
    setActiveDot();
})



function setActiveSlide() {
    slides.forEach((slide) => {
        slide.classList.remove('active')
    })
    slides[activeSlide].classList.add('active')

    
}

function setActiveDot() {
    dots.forEach((dot) => {
        dot.classList.remove('active')
    })
    dots[activeDot].classList.add('active')
}


