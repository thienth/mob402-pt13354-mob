var express = require('express');
var router = express.Router();
var Category = require('../models/category');
/* GET home page. */
router.get('/', function(req, res, next) {
  var products = [
    {
      id: 1,
      name: "iPhone XS Max",
      price: 28000000,
      image: "https://cdn.tmobile.com/content/dam/t-mobile/en-p/cell-phones/apple/apple-iphone-xs-max/gold/Apple-iPhoneXsMax-Gold-1-3x.jpg"
    },
    {
      id: 2,
      name: "Samsung Galaxy S10",
      price: 30000000,
      image: "https://static.digit.in/product/f478ec16da923691896d7a7dfbaea38d9ef5ee5d.jpeg"
    },
    {
      id: 3,
      name: "Oppo F1",
      price: 10000000,
      image: "https://images-na.ssl-images-amazon.com/images/I/61f%2BiLq26xL._SX679_.jpg"
    }
  ];

  var a = 100;

  res.render('index', {products: products, x: a});
});

router.get('/categories/:_id', async (req, res, next) => {
  let cates = await Category.find({_id: req.params._id});
  let cateList = await Category.find({});
  console.log(cates.length);
  console.log(cateList.length);
  console.log(1);
  res.send('ok');
});


module.exports = router;
