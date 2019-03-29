var express = require('express');
var router = express.Router();
var multer = require('multer');
var shortid = require('shortid');

var storage = multer.diskStorage({
  destination: function(req, file, cb){
    // cau hinh noi luu tru file upload
    cb(null, './public/uploads');
  },
  filename: function(req, file, cb){
    // cau hinh ten file upload
    cb(null, shortid.generate() + "-" + file.originalname);
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

router.post('/cates/save-add', upload.single('image'),function(req, res, next){

  var model = new Category();
  model.name = req.body.name;
  // lay anh = duong dan cua file vua upload len - loai bo tu public
  model.image = req.file.path.replace('public', '');
  model.description = req.body.description;

  model.save(function(err){
    res.redirect('/cates');
  });
});

router.get('/cates/edit/:cId', function(req, res, next){
  Category.findOne({_id: req.params.cId}, function(err, data){
    if(err){
      res.send('id khong ton tai');
    }
    res.render('category/edit', {cate: data});
  });
  
});

router.get('/cates/remove/:cId', function(req, res, next){
  Category.deleteOne({_id: req.params.cId}, function(err){
    if(err){
      res.send('Xoa khong thanh cong');
    }

    res.redirect('/cates');
  });
});

module.exports = router;
