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
document.body.onmousedown = () => {
    mouseDown = true
    return false
};
document.body.onmouseup = () => (mouseDown = false);

function draw(element) {
    currentOpacity = parseFloat(getComputedStyle(element).opacity);
    if (currentOpacity < 1 && mouseDown) {
        element.style.opacity =  currentOpacity + 0.25;
    }
}

const sizeButton = document.querySelector('#size-button');
sizeButton.addEventListener('click', () => {
    populateGrid(parseInt(prompt('Enter a dimension between 1 and 100 (default: 16):')));
})

window.onload = () => {
    populateGrid(16);
  }