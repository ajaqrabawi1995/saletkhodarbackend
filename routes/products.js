const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const fs = require('fs');
const path = require('path');

// Get all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a product
router.post('/', async (req, res) => {
  try {
    // Check if file was uploaded
    if (!req.file) {
      return res.status(400).json({ message: 'Image is required' });
    }

    // Create new product with all fields
    const product = new Product({
      name: req.body.name,
      category: req.body.category,
      price: Number(req.body.price),
      quantityKg: Number(req.body.quantityKg),
      quantityPieces: Number(req.body.quantityPieces),
      image: `uploads/${req.file.filename}`
    });

    const newProduct = await product.save();
    res.status(201).json(newProduct);
  } catch (error) {
    // If there's an error and a file was uploaded, delete it
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }
    console.error('Error creating product:', error);
    res.status(400).json({ message: error.message });
  }
});

// Update a product
router.put('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Update text fields
    product.name = req.body.name;
    product.category = req.body.category;
    product.price = Number(req.body.price);
    product.quantityKg = Number(req.body.quantityKg);
    product.quantityPieces = Number(req.body.quantityPieces);

    // Handle image update if new file is uploaded
    if (req.file) {
      // Delete old image if it exists
      const oldImagePath = path.join(__dirname, '..', product.image);
      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath);
      }
      // Set new image path
      product.image = `uploads/${req.file.filename}`;
    }

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } catch (error) {
    // If there's an error and a new file was uploaded, delete it
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }
    console.error('Error updating product:', error);
    res.status(400).json({ message: error.message });
  }
});

// Delete a product
router.delete('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Delete associated image file
    const imagePath = path.join(__dirname, '..', product.image);
    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }

    await product.deleteOne();
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ message: error.message });
  }
});

// Get single product
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router; 