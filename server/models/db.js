/**connect mongoose and define schema and exports it  */

var mongoose=require('mongoose');
var url = 'mongodb://localhost:27017/bridgedb';
var con=mongoose.connect(url);
 console.log(con)
var user=mongoose.Schema({

     email:{type:String ,required:true},
     password:{type:String,required:true}
 });

 var user=mongoose.model('user',user);
exports.user=user;
var project=mongoose.Schema({
     projectName :{type:String ,required:true},
    //  password:{type:String,required:true}
 });

 var project=mongoose.model('project',project);
exports.project=project;
