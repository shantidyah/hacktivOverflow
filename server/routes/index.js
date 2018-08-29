var express = require('express');
var router = express.Router();
const {Register, Login, Verify, LoginFB} = require('../controllers/user.js')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/register', Register) //done
router.post('/login', Login) // done
router.get('/verify', Verify) // done
router.post('/loginFb', LoginFB)
module.exports = router;
