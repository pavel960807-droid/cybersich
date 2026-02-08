// js/lottery.js
const LOTTERY = {
    ticketPrice: 10,
    burnRate: 0.2, // 20% спалюється
    
    buyTicket() {
        if (window.Game.balance < this.ticketPrice) {
            UI.showModal("ERROR", "Недостатньо $SICH для покупки квитка!");
            return;
        }
        window.Game.balance -= this.ticketPrice;
        Telegram.WebApp.HapticFeedback.notificationOccurred('success');
        UI.showModal("VAULT", "Квиток придбано! 2 $SICH відправлено в піч.");
    }
};
