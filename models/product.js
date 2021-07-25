const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    img: {
        type: Object,
    },
    desc: {
        type: String,
        minLength:1
    }


})

const Product = mongoose.model('Product', productSchema);

module.exports = Product;