const mongoose = require("mongoose");
const Product = require("../models/Products.model");
const createError = require("http-errors");
// GET ALL PRODUCTS
const getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.find({}, { __v: 0 });
    res.send(products);
  } catch (error) {
    res.send(error.message);
  }
};
// ADD PRODUCT
const addProduct = async (req, res, next) => {
  try {
    const product = new Product(req.body);
    const result = await product.save();
    res.send(result);
  } catch (err) {
    if (err.name === "ValidationError") {
      next(createError(422, err.message));
    }
    next(err);
  }
};
//GET PRODUCT BY ID
const getProductById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const product = await Product.findById(id);
    console.log();
    if (!product) {
      throw createError(404, "Product Not Found");
    }
    res.send(product);
  } catch (error) {
    // res.send(error.message);
    if (error instanceof mongoose.CastError) {
      next(createError(400, "Invalid Product ID"));
      return;
    }
    next(error);
  }
};
// DELETE PRODUCT BY ID
const deleteProductById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const result = await Product.findByIdAndDelete(id);
    if (!result) {
      throw createError(404, "Product Not Found");
    }
    res.send(result);
  } catch (error) {
    // res.send(error.message);
    if (error instanceof mongoose.CastError) {
      next(createError(400, "Invalid Product ID"));
      return;
    }
    next(error);
  }
};
// UPDATE PRODUCT BY ID
const updateProductById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const update = req.body;
    const options = { new: true };
    const result = await Product.findByIdAndUpdate(id, update, options);
    if (!result) {
      throw createError(404, "Product Not Found");
    }
    res.send(result);
  } catch (error) {
    // res.send(error.message);
    if (error instanceof mongoose.CastError) {
      next(createError(400, "Invalid Product ID"));
      return;
    }
    next(error);
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  addProduct,
  deleteProductById,
  updateProductById,
};
