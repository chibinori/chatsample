var express = require('express');
var router = express.Router();

/*モデル読み込み*/
var model = require('../model.js'),
    User  = model.User;

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/', function(req, res, next) {
    if(req.body.userName == null || req.body.password == null) {
      var err = '入力が正しくありません。確認して再入力してください。';
      res.render('../', {error: err ,
                          title: 'ポケットセラピストへようこそ',
                          sessionUser: req.session.user });
    }
    var newUser = new User(req.body);
    newUser.save(function(err){
        if(err){
            console.log(err);
            res.redirect(req.session.backURL || '/')
        }else{
            res.redirect('/');
        }
    });
});


module.exports = router;
