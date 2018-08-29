var express = require('express');
var router = express.Router();
const { List, Add, Search, Detail, Upvote , Downvote, DeleteQuest, Update } = require('../controllers/question')
const { Auth } = require('../middleware/auth')

router.get('/', List) //done
router.post('/add', Auth, Add) // done
router.get('/search', Search) //search?q= done
router.get('/detail/:id', Detail) // done
router.put('/upvote/:id', Auth, Upvote) // done
router.put('/downvote/:id', Auth, Downvote) // done
router.delete('/delete/:id', Auth, DeleteQuest) // done
router.put('/edit/:id', Auth, Update) // done

module.exports = router;
