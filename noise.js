const noise = new perlinNoise3d();
const canvas = document.createElement('canvas');
document.body.appendChild(canvas);
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

canvas.style.left = '0px';
canvas.style.top = '0px';
canvas.style.position = 'absolute';
canvas.style.backgroundColor = '#000';
noise.noiseSeed(Math.random());
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let now = Date.now();
    for (let i = 0; i < canvas.width; i += 10) {
        for (let j = 0; j < canvas.height; j += 10) {
            let index = (i + j * canvas.width) * 4;
            let v = noise.get(now / 2000, j / 100, i / 100);
            let angle = v * Math.PI * 2;
            let x = Math.cos(angle) * 15;
            let y = Math.sin(angle) * 15;
            ctx.lineCap = 'round';
            ctx.lineWidth = 10;
            ctx.beginPath();
            ctx.moveTo(i, j);
            ctx.lineTo(i + x, j + y);
            ctx.strokeStyle = '#fff4';
            ctx.stroke();
        }
    }
    requestAnimationFrame(draw);
}
draw();