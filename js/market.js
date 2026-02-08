// js/market.js - МОДУЛЬ ТОРГІВЛІ SICH
const MARKET = {
    items: [
        { id: 'booster_1', name: 'Енергетик Джури', price: 50, effect: '+20% до майнінгу' },
        { id: 'shield_1', name: 'Кібер-Щит', price: 150, effect: 'Захист від спалювання' }
    ],
    buy(itemId) {
        const item = this.items.find(i => i.id === itemId);
        if (window.Game.balance >= item.price) {
            window.Game.balance -= item.price;
            Telegram.WebApp.HapticFeedback.notificationOccurred('success');
            UI.showModal("МАРКЕТ", `Куплено: ${item.name}. Ефект активовано!`);
        } else {
            UI.showModal("ПОМИЛКА", "Недостатньо коштів на балансі!");
        }
    }
};
