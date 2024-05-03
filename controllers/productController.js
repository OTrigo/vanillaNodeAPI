const Product = require("../models/productModel");
const { getPostData } = require("../utils");

// @desc Get a list of products
// @route GET /api/products
async function getProducts(req, res) {
  try {
    const products = await Product.findAll();

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(products));
  } catch (error) {
    console.error(error);
  }
}

// @desc Get a product by its ID
// @route GET /api/products/:id
async function getProduct(req, res, id) {
  try {
    const product = await Product.findById(id);
    if (!!product) {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(product));
    } else {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Product not found" }));
    }
  } catch (error) {
    console.error(error);
  }
}

// @desc Create a Product
// @route POST /api/products
async function createProduct(req, res) {
  try {
    const body = await getPostData(req);
    const { title, description, price } = JSON.parse(body);

    const product = {
      title,
      description,
      price,
    };

    const newProduct = await Product.create(product);
    res.writeHead(201, { "Content-Type": "application/json" });
    return res.end(JSON.stringify(newProduct));
  } catch (error) {
    console.error(error);
  }
}

// @desc Update a Product
// @route PUT /api/products

async function updateProduct(req, res, id) {
  try {
    const product = await Product.findById(id);

    if (!product) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Product not found!" }));
    } else {
      const body = await getPostData(req);
      const { title, description, price } = JSON.parse(body);

      const productData = {
        title: title || product.title,
        description: description || product.description,
        price: price || product.price,
      };

      const updatedProduct = await Product.update(id, productData);

      res.writeHead(200, { "Content-Type": "application/json" });
      return res.end(JSON.stringify(updatedProduct));
    }
  } catch (error) {
    console.error(error);
  }
}

// @desc Delete a Product
// @route DELETE /api/product/:id

async function deleteProduct(req, res, id) {
  try {
    const product = await Product.findById(id);
    if (!!product) {
      await Product.remove(id);
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: `Product ${id} deleted` }));
    } else {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Product not found" }));
    }
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
