// js/engine.js (Version 5.0 - Interactive Environment)
class SichEngine {
    constructor() {
        this.canvas = document.getElementById('game-canvas');
        this.ctx = this.canvas.getContext('2d');
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.camera = { x: 0, y: 0 };
        this.balance = 0.085; // Початковий баланс зі скріншоту
        this.init();
    }

    init() {
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.setupInteractions();
        this.loop();
        
        setInterval(() => {
            this.balance += CONFIG.MINING_RATE;
            const balEl = document.getElementById('bal-val');
            if(balEl) balEl.innerText = this.balance.toFixed(3);
        }, 1000);
    }

    setupInteractions() {
        this.canvas.addEventListener('click', (e) => {
            const rect = this.canvas.getBoundingClientRect();
            const mouseX = e.clientX - rect.left;
            const mouseY = e.clientY - rect.top;
            const cx = this.width / 2;
            const cy = this.height / 2;

            // Перевірка кліку по Реактору (центр)
            const distToCore = Math.hypot(mouseX - cx, mouseY - cy);
            if(distToCore < 60) STAKING.openStakingPanel();
            
            // Перевірка кліку по Кузні (зліва зверху)
            const distToForge = Math.hypot(mouseX - (cx - 250), mouseY - (cy - 180));
            if(distToForge < 40) UI.showModal("FORGE", "Кузня готується до виплавки першого NFT...");
        });
    }

    // Рендеринг залишаємо професійним (з твого скріншоту)
    drawReactor(x, y) {
        const time = Date.now() * 0.002;
        const ctx = this.ctx;
        ctx.save();
        ctx.shadowBlur = 25; ctx.shadowColor = CONFIG.PRIMARY_COLOR;
        ctx.strokeStyle = CONFIG.PRIMARY_COLOR; ctx.lineWidth = 3;
        ctx.beginPath(); ctx.arc(x, y, 55 + Math.sin(time)*5, 0, Math.PI*2); ctx.stroke();
        ctx.setLineDash([8, 12]);
        ctx.beginPath(); ctx.arc(x, y, 85, time, time + Math.PI*0.8); ctx.stroke();
        ctx.restore();
    }

    drawGrid() {
        const s = CONFIG.GRID_SIZE;
        this.ctx.strokeStyle = 'rgba(0, 242, 255, 0.03)';
        for(let x=0; x<this.width; x+=s) { this.ctx.beginPath(); this.ctx.moveTo(x,0); this.ctx.lineTo(x,this.height); this.ctx.stroke(); }
        for(let y=0; y<this.height; y+=s) { this.ctx.beginPath(); this.ctx.moveTo(0,y); this.ctx.lineTo(this.width,y); this.ctx.stroke(); }
    }

    loop() {
        this.ctx.fillStyle = '#020205';
        this.ctx.fillRect(0, 0, this.width, this.height);
        this.drawGrid();
        this.drawReactor(this.width/2, this.height/2);
        requestAnimationFrame(() => this.loop());
    }
}
