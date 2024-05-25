class Line {
    constructor(x1, y1, x2, y2, color) {
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;
        this.originalX1 = x1;
        this.originalY1 = y1;
        this.originalX2 = x2;
        this.originalY2 = y2;
        this.color = color;
        this.maxDistance = 100; // Maximum distance for attraction
        this.attractionStrength = 0.1; // Strength of attraction
    }

    draw(context) {
        context.beginPath();
        context.moveTo(this.x1, this.y1);
        context.lineTo(this.x2, this.y2);
        context.strokeStyle = this.color;
        context.stroke();
        context.closePath();
    }

    update(context, mouseX, mouseY) {
        const dx1 = this.originalX1 - this.x1;
        const dy1 = this.originalY1 - this.y1;
        const dx2 = this.originalX2 - this.x2;
        const dy2 = this.originalY2 - this.y2;

        // Calculate distance between cursor and line endpoints
        const distToMouse1 = Math.hypot(mouseX - this.x1, mouseY - this.y1);
        const distToMouse2 = Math.hypot(mouseX - this.x2, mouseY - this.y2);

        // Apply attraction force if cursor is near enough
        if (distToMouse1 < this.maxDistance) {
            const attractionX1 = (mouseX - this.x1) * this.attractionStrength;
            const attractionY1 = (mouseY - this.y1) * this.attractionStrength;
            this.x1 += attractionX1;
            this.y1 += attractionY1;
        } else {
            // Move back to original position
            this.x1 += dx1 * 0.1;
            this.y1 += dy1 * 0.1;
        }

        if (distToMouse2 < this.maxDistance) {
            const attractionX2 = (mouseX - this.x2) * this.attractionStrength;
            const attractionY2 = (mouseY - this.y2) * this.attractionStrength;
            this.x2 += attractionX2;
            this.y2 += attractionY2;
        } else {
            // Move back to original position
            this.x2 += dx2 * 0.1;
            this.y2 += dy2 * 0.1;
        }

        this.draw(context);
    }
}


const canvas = document.getElementById('interactive-bg');
const context = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let lines = [];
const numberOfLines = 300; 
const colors = ['#00aaff', '#ffaa00', '#ff00aa', '#aaff00'];

function init() {
    lines = [];
    for (let i = 0; i < numberOfLines; i++) {
        const x1 = Math.random() * window.innerWidth;
        const y1 = Math.random() * window.innerHeight;
        const x2 = x1 + (Math.random() - 0.5) * 100;
        const y2 = y1 + (Math.random() - 0.5) * 100;
        const color = colors[Math.floor(Math.random() * colors.length)];
        lines.push(new Line(x1, y1, x2, y2, color));
    }
}

function animate(mouseX, mouseY) {
    requestAnimationFrame(() => animate(mouseX, mouseY));
    context.clearRect(0, 0, canvas.width, canvas.height);
    lines.forEach(line => line.update(context, mouseX, mouseY));
}

init();
animate();

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
});

window.addEventListener('mousemove', (event) => {
    const mouseX = event.clientX;
    const mouseY = event.clientY;
    animate(mouseX, mouseY);
});
