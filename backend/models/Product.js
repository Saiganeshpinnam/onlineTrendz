const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    id: {
        type: Number
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    category: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        default: 'https://via.placeholder.com/200'
    }
});

module.exports = mongoose.model('Product', productSchema);
