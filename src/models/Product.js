const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name       : { type: String, required: true, trim: true },
    quantity   : { type: Number, required: true },
    price_in   : { type: Number, required: true },
    price_out  : { type: Number },
    description: { type: String },
    image      : { type: String },
}, { timestamps: true })

module.exports = mongoose.model('Product', productSchema)