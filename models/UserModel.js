var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var UserSchema   = new Schema({
    name: String,
    nick_name:String,
    password:String
},  { collection: 'Users' });

module.exports = mongoose.model('User', UserSchema);
