const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: ['fruit', 'vegetable'],
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  quantityKg: {
    type: Number,
    required: true
  },
  quantityPieces: {
    type: Number,
    required: true
  },
  image: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Product', productSchema); 