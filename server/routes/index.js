var express = require('express');
var router = express.Router();
const {Register, Login} = require('../controllers/user.js')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/register', Register)
router.post('/login', Login)

module.exports = router;
