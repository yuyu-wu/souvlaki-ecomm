const rippleButtons = document.querySelectorAll('.ripple')

rippleButtons.forEach((button) => {
    button.addEventListener('click', function (e) {
        const x = e.clientX;
        const y = e.clientY;
        // console.log(x, y)
        const buttonTop = e.target.offsetTop;  // target is always the element that the event fires off of. Here it's the button
        const buttonLeft = e.target.offsetLeft;
        // console.log(buttonTop, buttonLeft)
        const xInside = x - buttonLeft;
        const yInside = y - buttonTop;
        // console.log(xInside, yInside);
        const circle = document.createElement('span');
        circle.classList.add('circle');
        circle.style.left = xInside + 'px';
        circle.style.top = yInside + 'px';

        this.append(circle)

        setTimeout(() => circle.remove(), 500)
    })
})