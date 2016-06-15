var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('reception', { title: '受付',
                        sessionUser: req.session.user });
});

module.exports = router;
