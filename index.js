const canvas = document.getElementById('signatureCanvas');
const ctx = canvas.getContext('2d');

resizeCanvas();
window.addEventListener('resize', resizeCanvas);

function resizeCanvas() {
    canvas.width = window.innerWidth * 0.8;
    canvas.height = window.innerHeight * 0.6;
    canvas.style.width = canvas.width + 'px';
    canvas.style.height = canvas.height + 'px';
}

let isDrawing = false;
let lastX = 0;
let lastY = 0;

function draw(e) {
    if (!isDrawing) return;
    e.preventDefault();

    let x, y;
    if (e.touches) {
        const rect = canvas.getBoundingClientRect();
        x = e.touches[0].clientX - rect.left;
        y = e.touches[0].clientY - rect.top;
    } else {
        x = e.offsetX;
        y = e.offsetY;
    }

    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(x, y);
    ctx.stroke();

    lastX = x;
    lastY = y;
}

canvas.addEventListener('mousedown', (e) => {
    isDrawing = true;
    [lastX, lastY] = [e.offsetX, e.offsetY];
});

canvas.addEventListener('touchstart', (e) => {
    isDrawing = true;
    const rect = canvas.getBoundingClientRect();
    [lastX, lastY] = [e.touches[0].clientX - rect.left, e.touches[0].clientY - rect.top];
});

canvas.addEventListener('mousemove', draw);
canvas.addEventListener('touchmove', draw);

canvas.addEventListener('mouseup', () => isDrawing = false);
canvas.addEventListener('touchend', () => isDrawing = false);

canvas.addEventListener('mouseout', () => isDrawing = false);

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function downloadSignature() {
    const dataUrl = canvas.toDataURL(); // defaults to png format
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = 'signature.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

const btn = document.getElementById("download-btn");
btn.addEventListener("click", ()=>{
  btn.style.scale = 0.9;
  setTimeout(()=>{
    btn.style.scale = 1;
  }, 200)
})