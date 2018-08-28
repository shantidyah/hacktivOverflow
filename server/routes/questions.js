var express = require('express');
var router = express.Router();
const { List, Add, Search, Detail, Upvote , Downvote, DeleteQuest } = require('../controllers/question')
const { Auth } = require('../middleware/auth')

router.get('/', List)
router.post('/add/', Auth, Add)
router.get('/search', Search) //search?q=
router.get('/detail/:id', Detail)
router.put('/upvote/:id', Auth, Upvote)
router.put('/downvote/:id', Auth, Downvote)
router.delete('/delete/:id', Auth, DeleteQuest)

module.exports = router;
