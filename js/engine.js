// js/engine.js (Version 3.0 - Multi-Node World)
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
        
        setInterval(() => {
            this.balance += CONFIG.MINING_RATE;
            document.getElementById('bal-val').innerText = this.balance.toFixed(3);
        }, 1000);

        // Додаємо базову взаємодію (можна буде рухати карту пізніше)
        window.addEventListener('resize', () => {
            this.width = window.innerWidth;
            this.height = window.innerHeight;
            this.canvas.width = this.width;
            this.canvas.height = this.height;
        });
    }

    drawReactor(x, y) {
        const ctx = this.ctx;
        const time = Date.now() * 0.002;
        ctx.save();
        ctx.shadowBlur = 15 + Math.sin(time) * 10;
        ctx.shadowColor = CONFIG.PRIMARY_COLOR;
        ctx.strokeStyle = CONFIG.PRIMARY_COLOR;
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(x, y, 50 + Math.sin(time) * 5, 0, Math.PI * 2);
        ctx.stroke();
        ctx.setLineDash([5, 15]);
        ctx.beginPath();
        ctx.arc(x, y, 80, time, time + Math.PI);
        ctx.stroke();
        ctx.restore();
        this.drawLabel("CORE_REACTOR", x, y + 110);
    }

    drawForge(x, y) {
        const ctx = this.ctx;
        const time = Date.now() * 0.002;
        ctx.save();
        ctx.shadowBlur = 15;
        ctx.shadowColor = CONFIG.SECONDARY_COLOR;
        ctx.strokeStyle = CONFIG.SECONDARY_COLOR;
        ctx.lineWidth = 2;
        
        // Малюємо ізометричну форму кузні (ромб/кристал)
        ctx.beginPath();
        ctx.moveTo(x, y - 40 - Math.sin(time)*5);
        ctx.lineTo(x + 40, y);
        ctx.lineTo(x, y + 40 + Math.sin(time)*5);
        ctx.lineTo(x - 40, y);
        ctx.closePath();
        ctx.stroke();
        
        // Внутрішній ефект "вогню"
        ctx.fillStyle = "rgba(255, 242, 0, 0.1)";
        ctx.fill();
        ctx.restore();
        this.drawLabel("NFT_FORGE", x, y + 70);
    }

    drawLabel(text, x, y) {
        this.ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
        this.ctx.font = "9px Orbitron, monospace";
        this.ctx.textAlign = "center";
        this.ctx.fillText(text, x, y);
    }

    loop() {
        this.ctx.fillStyle = '#020205';
        this.ctx.fillRect(0, 0, this.width, this.height);
        
        this.drawGrid();
        
        // Центр світу
        const cx = this.width / 2 + this.camera.x;
        const cy = this.height / 2 + this.camera.y;

        this.drawReactor(cx, cy);             // Реактор у центрі
        this.drawForge(cx - 250, cy - 150);   // Кузня зміщена вліво-вгору
        
        requestAnimationFrame(() => this.loop());
    }

    drawGrid() {
        const s = CONFIG.GRID_SIZE;
        this.ctx.strokeStyle = 'rgba(0, 242, 255, 0.02)';
        for(let x = (this.camera.x % s); x < this.width; x += s) {
            this.ctx.beginPath(); this.ctx.moveTo(x, 0); this.ctx.lineTo(x, this.height); this.ctx.stroke();
        }
        for(let y = (this.camera.y % s); y < this.height; y += s) {
            this.ctx.beginPath(); this.ctx.moveTo(0, y); this.ctx.lineTo(this.width, y); this.ctx.stroke();
        }
    }
}
