var express = require('express');
var router = express.Router();

/*モデル読み込み*/
var model = require('../model.js'),
    User  = model.User;

router.get('/', function(req, res, next) {
  res.render('login', { title: 'ログイン',
                        sessionUser: req.session.user });
});

router.post('/', function(req, res, next) {
  if(req.body.userName == null || req.body.password == null) {
    var err = '入力が正しくありません。確認して再入力してください。';
    res.render('login', {error: err ,
                        title: 'ログイン',
                        sessionUser: req.session.user });
  }
  
  var query = { "userName": req.body.userName, "password": req.body.password };
  User.find(query, function(err, data){
      if(err){
          console.log(err);
      }
      if(data == ""){
        var err = 'ユーザー名またはパスワードが正しくありません。確認して再入力してください。';
        res.render('login', {error: err ,
                            title: 'ログイン',
                            sessionUser: req.session.user });
      }else{
        req.session.user = {name: req.body.userName};
        res.redirect('../');
      }
  });

});

module.exports = router;
