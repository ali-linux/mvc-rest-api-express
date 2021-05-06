const express = require("express");
const router = express.Router();
const productController = require("../Controllers/Product.controller");

// GET ALL PRODUCTS ROUTE
router.get("/", productController.getAllProducts);
// CREATE PRODUCT ROUTE
router.post("/", productController.addProduct);
// GET PRODUCT ROUTE
router.get("/:id", productController.getProductById);
// UPDATE PRODUCT ROUTE
router.put("/:id", productController.updateProductById);
// DELETE  PRODUCT ROUTE
router.delete("/:id", productController.deleteProductById);

module.exports = router;
