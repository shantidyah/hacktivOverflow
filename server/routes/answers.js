var express = require('express');
var router = express.Router();
const { Auth } = require('../middleware/auth')
const { Add, List, Downvote, Upvote } = require('../controllers/answer')

router.get('/', List)
router.post('/add/:qid', Auth, Add)
router.put('/downvote/:id', Auth, Downvote)
router.put('/upvote/:id', Auth, Upvote)

module.exports = router;
