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
var Product = require('../models/product');
/* Danh sach san pham */
router.get('/', function(req, res, next) {
  Product.find({})
          .populate('cate_id')
          .exec(function(err, data){
            if(err){
              res.send('Da co loi he thong');
            }
            res.render('product/index', { products: data });
          });
});

router.get('/products/add', function(req, res, next){
  Category.find({}, function(err, cates){
    res.render('product/add-form', {cates: cates});
  })
});

router.post('/products/save-add', upload.single('image'), function(req, res, next){
  var model = new Product();
  model.name = req.body.name;
  model.price = req.body.price;
  model.cate_id = req.body.cate_id;
  model.detail = req.body.detail;
  model.image = req.file.path.replace('public', '');

  model.save(function(err){
    if(err){
      res.send("Luu khong thanh cong")
    }
    res.redirect('/');
  });
});

router.get('/products/remove/:pId', function(req, res, next){
  Product.deleteOne({_id: req.params.pId}, function(err){
    if(err){
      res.send('Xoa khong thanh cong');
    }

    res.redirect('/');
  });
});

router.get('/products/edit/:pId', function(req, res, next){
  Product.findOne({_id: req.params.pId}, function(err, data){
    if(err){
      res.send('id khong ton tai');
    }
    

    Category.find({}, function(err, cates){

      for (let i = 0; i < cates.length; i++) {
        if(cates[i].id == data.cate_id.toString()){
          cates[i].selected = true;
          break;
        }
      }

      console.log(cates);
      res.render('product/edit-form', {product: data, cates: cates});
    })
  });
});

router.post('/products/save-edit', upload.single('image'), function(req, res, next){
  Product.findOne({_id: req.body.id}, function(err, model){
    model.name = req.body.name;
    model.price = req.body.price;
    model.detail = req.body.detail;
    model.cate_id = req.body.cate_id;
    if(req.file != null){
      model.image = req.file.path.replace('public', '');
    }

    model.save(function(err){
      if(err){
        res.send('Luu khong thanh cong');
      }

      res.redirect('/');
    })
  })
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

router.post('/cates/save-edit', upload.single('image'), function(req, res, next){
  // lay ra id tu form gui len
  var cId = req.body.id;
  // 1. lay thong tin category dua vao id
  Category.findOne({_id: cId}, function(err, model){
    if(err){
      res.send('id khong ton tai');
    }
    // 2. add thong tin tu form vao model
    model.name = req.body.name;
    model.description = req.body.description;
    // 3. Kiem tra xem co anh hay khong
    if(req.file != null){
      model.image = req.file.path.replace('public', '');
    }

    // 4. luu model lai
    model.save(function(err){
      if(err){
        res.send('Luu khong thanh cong');
      }
      res.redirect('/cates');
    })

  })
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
