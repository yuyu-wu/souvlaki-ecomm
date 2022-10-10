// toggler navbar menu
const toggler = document.querySelector('#toggler')
toggler.addEventListener('click', () => {
    const navItems = document.querySelector('.nav-items');
    navItems.classList.toggle('fold');
})

// scroll animation
const nav = document.querySelector('.nav')
window.addEventListener('scroll', () => {
    if (window.scrollY > nav.offsetHeight + 150) {
        nav.classList.add('active')
    } else {
        nav.classList.remove('active')
    }
})

// get navbar height in css
document.documentElement.style.setProperty('--nav-height', nav.offsetHeight)