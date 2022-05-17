const MAX_SIZE = 50;

// Grid
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
        cell.addEventListener('mouseover', (event) => hoverDraw(event.target));
        cell.addEventListener('mousedown', (event) => draw(event.target));
        grid.appendChild(cell); 
    }
    return;
}

// Drawing
let mouseDown = false;
document.body.addEventListener('mousedown', () => mouseDown = true);
document.body.addEventListener('mouseup', () => mouseDown = false);

function hoverDraw(element) {
    if (mouseDown) {
        draw(element);
    }
}
function draw (element) {
    switch (mode) {
        case 'color':
            element.style.backgroundColor = color;
            break;
        case 'darken':
            let newColor = tinycolor(element.style.backgroundColor).darken(20).toString();
            element.style.backgroundColor = newColor;
            break;
        case 'rainbow':
            randomColor = Math.floor(Math.random()*16777215).toString(16);
            element.style.backgroundColor = '#' + randomColor;
            break;
        case 'eraser':
            element.style.backgroundColor = '#FFFFFF';
    }
}

// Mode select
let mode;
const colorModeButton = document.querySelector('#color-mode');
colorModeButton.addEventListener('click', () => selectMode('color'));
const darkenModeButton = document.querySelector('#darken-mode');
darkenModeButton.addEventListener('click', () => selectMode('darken'));
const rainbowModeButton = document.querySelector('#rainbow-mode');
rainbowModeButton.addEventListener('click', () => selectMode('rainbow'));
const eraserModeButton = document.querySelector('#eraser-mode');
eraserModeButton.addEventListener('click', () => selectMode('eraser'));
function selectMode(newMode) {
    colorModeButton.classList.remove('active');
    darkenModeButton.classList.remove('active');
    rainbowModeButton.classList.remove('active');
    eraserModeButton.classList.remove('active');
    switch (newMode) {
        case 'color':
            colorModeButton.classList.add('active');
            mode = 'color';
            break;
        case 'darken':
            darkenModeButton.classList.add('active');
            mode = 'darken';
            break;
        case 'rainbow':
            rainbowModeButton.classList.add('active');
            mode = 'rainbow';
            break;
        case 'eraser':
            eraserModeButton.classList.add('active' );
            mode = 'eraser';
            break;
    }
    return;
}

// Grid Lines
let gridLines = false;
const gridLineButton = document.querySelector('#grid-line');
gridLineButton.addEventListener('click', (e) => {
    let cells = Array.from(grid.childNodes);
    if (gridLines) {
        gridLines = false;
        gridLineButton.classList.remove('active');
        cells.forEach(element => element.classList.remove('grid-outline'));
    } else {
        gridLines = true;
        gridLineButton.classList.add('active');
        cells.forEach(element => element.classList.add('grid-outline'));
    }
})

// Slider input
const sizeSliderLabel = document.querySelector('#slider-label');
const sizeSlider = document.querySelector('#size-slider');
sizeSlider.addEventListener('input', (e) => {
    sizeSliderLabel.textContent = `Grid: ${e.target.value}x${e.target.value}`;
});
sizeSlider.onchange = (e) => {
    populateGrid(e.target.value);
};

// Color input
let color = '#000000';
const colorPicker = document.querySelector('#color-picker');
colorPicker.addEventListener('input', (e) => color = colorPicker.value);

// Initialisation
window.onload = () => {
    selectMode('color');
    colorPicker.value = '#000000';
    sizeSliderLabel.textContent = `Grid: 16x16`;
    sizeSlider.value = 16;
    populateGrid(16);
}
