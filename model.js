var mongoose = require('mongoose');
var url = 'mongodb://localhost/pt';
var db  = mongoose.createConnection(url, function(err, res){
    if(err){
        console.log('Error connected: ' + url + ' - ' + err);
    }else{
        console.log('Success connected: ' + url);
    }
});

// Modelの定義
var UserSchema = new mongoose.Schema({
    userName    : String,
    password  : String
},{collection: 'info'});

exports.User = db.model('User', UserSchema);
