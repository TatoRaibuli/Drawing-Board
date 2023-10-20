const canvas = document.getElementById('canvas')
const colorPicker = document.getElementById('color-picker')
const tools = document.querySelectorAll('.tool')
const eraser = document.getElementById('eraser')
const brush = document.getElementById('brush')
const reload = document.getElementById('reload')
const downloadBtn = document.getElementById('download')
let lastColor = ""
const download = () => {
    html2canvas(canvas).then(function(canvas) {
        const image = canvas.toDataURL("image/png");

        const link = document.createElement("a");
        link.href = image;
        link.download = "canvas.png";
        link.click();
    });
}

downloadBtn.addEventListener('click', () => download())


tools.forEach(tool => {
    tool.addEventListener('click', () => {
        tools.forEach(tool => {
            tool.classList.remove('active')
        })
        tool.classList.add('active')
    })
})
const paint = (color, pixel) => {
    pixel.style.backgroundColor = color
    lastColor = color
}
let brushActive = false
for (let i = 0; i < 64 ** 2 - 1; i++) {
    const cell = document.createElement('div')
    cell.classList.add('cell')
    cell.addEventListener('mousedown', (e) => {
        e.preventDefault();
        brushActive = true
    })
    cell.addEventListener('mouseup', (e) => {
        e.preventDefault();
        brushActive = false
    })
    cell.addEventListener('mouseenter', (e) => {
        e.preventDefault();
        if (brushActive) {
            const color = colorPicker.value
            paint(color, cell)
        }

    })
    canvas.appendChild(cell)
}

eraser.addEventListener('click', () => {
    colorPicker.value = "#FFFFFF"
})
brush.addEventListener('click', () => {
    colorPicker.value = lastColor
})

reload.addEventListener('click', () => {
    const allCells = document.querySelectorAll('.cell')
    allCells.forEach((cell) => {
        cell.style.backgroundColor = "#FFFFFF"
        colorPicker.value = "#000000"
    })
    reload.classList.add('reloaded')
    setTimeout(() => reload.classList.remove('reloaded'), 50)
})