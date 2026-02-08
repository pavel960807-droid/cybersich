// js/engine.js (Version 2.0 - Rendering & Interaction)
class SichEngine {
    constructor() {
        this.canvas = document.getElementById('game-canvas');
        this.ctx = this.canvas.getContext('2d');
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        
        this.camera = { x: 0, y: 0 };
        this.balance = 0;
        
        this.init();
    }

    init() {
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.loop();
        
        // Починаємо видобуток SICH
        setInterval(() => {
            this.balance += CONFIG.MINING_RATE;
            document.getElementById('bal-val').innerText = this.balance.toFixed(3);
        }, 1000);
    }

    drawReactor() {
        const ctx = this.ctx;
        const centerX = this.width / 2 + this.camera.x;
        const centerY = this.height / 2 + this.camera.y;
        const time = Date.now() * 0.002;

        // Ефект неонового пульсування
        ctx.save();
        ctx.shadowBlur = 20 + Math.sin(time) * 10;
        ctx.shadowColor = CONFIG.PRIMARY_COLOR;
        ctx.strokeStyle = CONFIG.PRIMARY_COLOR;
        ctx.lineWidth = 3;

        // Малюємо основне ядро
        ctx.beginPath();
        ctx.arc(centerX, centerY, 60 + Math.sin(time) * 5, 0, Math.PI * 2);
        ctx.stroke();

        // Малюємо орбіти навколо реактора
        ctx.setLineDash([10, 20]);
        ctx.beginPath();
        ctx.arc(centerX, centerY, 100, time, time + Math.PI * 1.5);
        ctx.stroke();
        ctx.restore();

        ctx.fillStyle = "#fff";
        ctx.font = "12px monospace";
        ctx.textAlign = "center";
        ctx.fillText("CORE_REACTOR_STAKING", centerX, centerY + 140);
    }

    loop() {
        this.ctx.fillStyle = '#020205';
        this.ctx.fillRect(0, 0, this.width, this.height);
        
        this.drawGrid();
        this.drawReactor();
        
        requestAnimationFrame(() => this.loop());
    }

    drawGrid() {
        const s = CONFIG.GRID_SIZE;
        this.ctx.strokeStyle = 'rgba(0, 242, 255, 0.03)';
        for(let x = 0; x < this.width; x += s) {
            this.ctx.beginPath(); this.ctx.moveTo(x, 0); this.ctx.lineTo(x, this.height); this.ctx.stroke();
        }
        for(let y = 0; y < this.height; y += s) {
            this.ctx.beginPath(); this.ctx.moveTo(0, y); this.ctx.lineTo(this.width, y); this.ctx.stroke();
        }
    }
}
