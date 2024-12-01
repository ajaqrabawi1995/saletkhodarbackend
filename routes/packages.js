const express = require('express');
const router = express.Router();
const Package = require('../models/Package');

// Get all packages
router.get('/', async (req, res) => {
  try {
    const packages = await Package.find().sort({ createdAt: -1 });
    res.json(packages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a package
router.post('/', async (req, res) => {
  try {
    const package = new Package({
      name: req.body.name,
      items: req.body.items.map(item => ({
        product: {
          name: item.product.name,
          price: item.product.price,
          category: item.product.category,
          image: item.product.image,
          quantityKg: item.product.quantityKg,
          quantityPieces: item.product.quantityPieces
        }
      })),
      totalPrice: req.body.totalPrice
    });

    const newPackage = await package.save();
    res.status(201).json(newPackage);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a package
router.delete('/:id', async (req, res) => {
  try {
    await Package.findByIdAndDelete(req.params.id);
    res.json({ message: 'Package deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single package
router.get('/:id', async (req, res) => {
  try {
    const package = await Package.findById(req.params.id);
    if (!package) {
      return res.status(404).json({ message: 'Package not found' });
    }
    res.json(package);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router; 