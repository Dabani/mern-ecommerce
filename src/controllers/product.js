
const Product = require('../models/product');
const slugify = require('slugify');
const shortid = require('shortid');

/* 
function createProducts(products, parentId = null) {
  const productList = [];
  let product;
  if (parentId == null) {
    product = products.filter(prod => prod.parentId == undefined);
  } else {
    product = products.filter(prod => prod.parentId == parentId);
  }

  for (let prodt of product) {
    productList.push({
      _id: prodt._id,
      name: prodt.name,
      slug: prodt.slug,
      children: createProducts(products, prodt._id)
    });
  }

  return productList;
}
 */
exports.createProduct = (req, res) => {
  // res.status(200).json({ file: req.files, body: req.body })
  const {
    name,
    price,
    quantity,
    description,
    category,
    createdBy
  } = req.body;

  let productPictures = [];

  if (req.files.length > 0) {
    productPictures = req.files.map(file => {
      return { img: file.filename }
    });
  }

  const product = new Product({
    name: name,
    slug: slugify(name).toLowerCase(),
    price,
    quantity,
    description,
    productPictures,
    category,
    createdBy: req.user._id
  });

  product.save(((error, product) => {
    if (error) {
      return res.status(400).json({ error });
    }
    if (product) {
      res.status(201).json({ product });
    }
  }));



  /* 
  const productObj = {
    name: req.body.name,
    slug: slugify(req.body.name).toLowerCase(),
    description: req.body.description,
    price: req.body.price
  }

  if (req.body.parentId) {
    productObj.parentId = req.body.parentId;
  }

  const prod = new product(productObj);
  prod.save((error, product) => {
    if (error) return res.status(400).json({ error });
    if (product) {
      return res.status(201).json({ product });
    }
  });
 */
}

exports.getProducts = (req, res) => {
  product.find({})
    .exec((error, products) => {
      if (error) return res.status(400).json({ error });
      if (products) {

        const productList = createProducts(products);
        res.status(200).json({ productList });
      }

    })
}
