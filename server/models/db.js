/**connect mongoose and define schema and exports it  */

var mongoose=require('mongoose');
 mongoose.Promise = global.Promise;
var config = require('../config/config');
mongoose.connect(config.MONGO_URI);
 
var userSchema=mongoose.Schema({
    
     email:{type:String ,unique: true, lowercase: true},
     password:{type:String,select: false},
     displayName: String,
     picture: String,
     github: String
 });

 var User=mongoose.model('User',userSchema);
exports.User=User;