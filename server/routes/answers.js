var express = require('express');
var router = express.Router();
const { Auth } = require('../middleware/auth')
const { Add, List, Downvote, Upvote, Update } = require('../controllers/answer')

router.get('/', List)
router.post('/add/:qid', Auth, Add) // done
router.put('/downvote/:id', Auth, Downvote) // done
router.put('/upvote/:id', Auth, Upvote) //
router.put('/edit/:id', Auth, Update)

// edit belom

module.exports = router;
