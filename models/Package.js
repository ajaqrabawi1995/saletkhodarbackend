const mongoose = require('mongoose');

const packageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  items: [{
    product: {
      name: String,
      price: Number,
      category: String,
      image: String,
      quantityKg: Number,
      quantityPieces: Number
    }
  }],
  totalPrice: {
    type: Number,
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Package', packageSchema); 