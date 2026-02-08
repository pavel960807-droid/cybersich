// js/nft_data.js
const NFT_DATABASE = {
    rarity: {
        LEGENDARY: { color: "#fff200", chance: 0.05, boost: 5.0 },
        RARE: { color: "#bd00ff", chance: 0.15, boost: 2.5 },
        COMMON: { color: "#00f2ff", chance: 0.80, boost: 1.2 }
    },
    units: [
        { id: 1, name: "Байда Вишневецький", rarity: "LEGENDARY", power: 99, skill: "Засновник Січі" },
        { id: 2, name: "Іван Сірко", rarity: "LEGENDARY", power: 98, skill: "Характерник" },
        { id: 3, name: "Максим Кривоніс", rarity: "RARE", power: 85, skill: "Стихійний удар" },
        { id: 4, name: "Джура Розвідник", rarity: "COMMON", power: 40, skill: "Швидкість" }
        // Ми додамо сюди решту до 50 штук у наступних оновленнях
    ]
};

console.log("NFT Database Loaded: " + NFT_DATABASE.units.length + " units registered.");
