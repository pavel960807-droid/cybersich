// js/engine.js
class SichEngine {
    constructor() {
        this.canvas = document.getElementById('game-canvas');
        this.ctx = this.canvas.getContext('2d');
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.camera = { x: 0, y: 0 };
        this.init();
    }

    init() {
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.loop();
    }

    loop() {
        this.ctx.fillStyle = '#020205';
        this.ctx.fillRect(0, 0, this.width, this.height);
        
        // Малюємо світ (логіка буде розширюватись)
        this.drawGrid();
        
        requestAnimationFrame(() => this.loop());
    }

    drawGrid() {
        this.ctx.strokeStyle = 'rgba(0, 242, 255, 0.05)';
        for(let x = 0; x < this.width; x += 100) {
            this.ctx.beginPath(); this.ctx.moveTo(x, 0); this.ctx.lineTo(x, this.height); this.ctx.stroke();
        }
        for(let y = 0; y < this.height; y += 100) {
            this.ctx.beginPath(); this.ctx.moveTo(0, y); this.ctx.lineTo(this.width, y); this.ctx.stroke();
        }
    }
}
