var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('home', { title: req.session.user.name + 'さんようこそ',
                      sessionUser: req.session.user});
});

module.exports = router;
