var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var SessionSchema   = new Schema({
    token: String,
    user:  [{ type: Schema.Types.ObjectId, ref: 'User' }]
},  { collection: 'Session' });

module.exports = mongoose.model('Session', SessionSchema);