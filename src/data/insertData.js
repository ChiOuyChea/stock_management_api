const Product = require("../models/Product");

const insertData = async () => {
    const productData = [
        {
            name: "Coca Cola",
            quantity: 10,
            price_in: 50,
            price_out: 120,
            description: "This is coca cola",
            image: "https://www.coca-cola.com/content/dam/onexp/us/en/brands/coca-cola-spiced/coke-product-category-card.png",
        },
        {
            name: "Pepsi",
            quantity: 15,
            price_in: 45,
            price_out: 110,
            description: "This is Pepsi",
            image: "https://www.onestop.co.uk/wp-content/uploads/ace2fd39-2fc5-4cc0-9b23-2268b49f3f52.png",
        },
        {
            name: "Fanta",
            quantity: 20,
            price_in: 40,
            price_out: 100,
            description: "This is Fanta orange",
            image: "https://www.bbassets.com/media/uploads/p/l/251019_8-fanta-soft-drink-orange-flavoured.jpg",
        },
        {
            name: "Sprite",
            quantity: 25,
            price_in: 35,
            price_out: 90,
            description: "This is Sprite",
            image: "https://jggp.jayagrocer.com/cdn/shop/files/007956-1-1.jpg?v=1749031551",
        },
        {
            name: "Mountain Dew",
            quantity: 12,
            price_in: 55,
            price_out: 130,
            description: "This is Mountain Dew",
            image: "https://www.bbassets.com/media/uploads/p/l/265874_5-mountain-dew-soft-drink.jpg",
        },
    ];

    try {
        await Product.insertMany(productData);
        console.log("Products inserted successfully!");
    } catch (error) {
        console.error("Error inserting products:", error.message);
    }
};

module.exports = insertData;