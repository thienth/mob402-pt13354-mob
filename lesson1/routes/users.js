var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('duong dan: localhost:3000/users');
});

router.get('/add', function(req, res, next) {
  res.send('tạo tài khoản mới');
});

module.exports = router;
