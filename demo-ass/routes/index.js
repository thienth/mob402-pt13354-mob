var express = require('express');
var router = express.Router();
var multer = require('multer');
var storage = multer.diskStorage({
  destination: function(req, file, cb){
    // cau hinh noi luu tru file upload
    cb(null, './public/uploads');
  },
  filename: function(req, file, cb){
    // cau hinh ten file upload
    cb(null, file.originalname);
  }
});

var upload = multer({ storage: storage});

var Category = require('../models/category');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/cates', function(req, res, next){
  Category.find({}, function(err, data){

    res.render('category/index', {cates: data});
  });
  
});
router.get('/cates/add', function(req, res, next){
  res.render('category/add');
});

router.post('/cates/save-add', function(req, res, next){

  var model = new Category();
  model.name = req.body.name;
  model.image = req.body.image;
  model.description = req.body.description;

  model.save();
  res.redirect('/cates');
});

router.get('/cates/edit', function(req, res, next){
  res.render('category/edit');
});

module.exports = router;
