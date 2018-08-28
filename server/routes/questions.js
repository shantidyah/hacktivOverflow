var express = require('express');
var router = express.Router();
const { List, Add } = require('../controllers/question')
const { Auth } = require('../middleware/auth')

router.get('/', List)
router.post('/add/', Auth, Add)

module.exports = router;
