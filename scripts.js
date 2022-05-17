const MAX_SIZE = 50;

const grid = document.querySelector('#grid');
function populateGrid(size) {
    if (size < 1 || size > MAX_SIZE ) {
        alert(`The grid only accepts values between 1 and ${MAX_SIZE}!`);
        return;
    }
    grid.innerHTML = '';
    grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    grid.style.gridTemplateRows = `repeat(${size}, 1fr)`;
    for (let i = 0; i < (size * size); i++) {
        let cell = document.createElement('div');
        cell.classList.add('cell');
        cell.addEventListener('mouseover', (event) => draw(event.target))
        grid.appendChild(cell); 
    }
    return;
}

let mouseDown = false;
document.body.addEventListener('mousedown', () => mouseDown = true);
document.body.addEventListener('mouseup', () => mouseDown = false);

function draw(element) {
    currentOpacity = parseFloat(getComputedStyle(element).opacity);
    if (currentOpacity < 1 && mouseDown) {
        element.style.opacity =  currentOpacity + 0.25;
    }
}

// Slider input
const sizeSlider = document.querySelector('#size-slider');
const sizeSliderLabel = document.querySelector('#slider-label');
sizeSlider.oninput = (e) => {
    sizeSliderLabel.textContent = `Grid: ${e.target.value}x${e.target.value}`;
};
sizeSlider.onchange = (e) => {
    populateGrid(e.target.value);
};

window.onload = () => {
    populateGrid(16);
    sizeSliderLabel.textContent = `Grid: ${16}x${16}`;
}
