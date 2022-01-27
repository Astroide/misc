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
            let ki = i;//Math.log2(i ** 50) * Math.log(Math.sqrt(i * i + j * j));
            let kj = j;//Math.log2(j ** 50) * Math.log(Math.sqrt(i * i + j * j));
            let v = noise.get(now / 2000, kj / 500, ki / 500);
            let angle = v * Math.PI * 16;
            let x = Math.cos(angle) * 10;
            let y = Math.sin(angle) * 10;
            ctx.lineCap = 'round';
            ctx.lineWidth = 10;
            ctx.beginPath();
            ctx.moveTo(i, j);
            ctx.lineTo(i + x, j + y);
            // ctx.strokeStyle = '#fff4';
            let cv = Math.abs(v - noise.get(now / 2000 + 10, (kj) / 500, (ki) / 500)) + Math.abs(v - noise.get(now / 2000 - 10, (kj) / 500, (ki) / 500));
            cv **= 2;
            ctx.strokeStyle = `hsla(${v * 360}, 100%, 50%, ${cv})`;
            ctx.stroke();
        }
    }
    requestAnimationFrame(draw);
}
draw();