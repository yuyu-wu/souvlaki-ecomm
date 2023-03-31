// Toggle navbar menu
const toggler = document.querySelector('#toggler');
const navItems = document.querySelector('.nav-items');
toggler.addEventListener('click', () => {
    navItems.classList.toggle('fold');
})

// Scroll animation
const nav = document.querySelector('.nav')
window.addEventListener('scroll', () => {
    if (window.scrollY > nav.offsetHeight + 150) {
        nav.classList.add('active')
    } else {
        nav.classList.remove('active')
    }
})