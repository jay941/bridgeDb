
// define require module for app                   

var express=require('express');
var router=express.Router();
var con=require('../models/db');

router.post('/signup',function(req,res){
	
		var email=req.body.email;
		var password=req.body.password;
		

	if(email.match(/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/)){
			var data=new con.user({email,password});
					data.save(function(err,data){
						if(err){
							res.send(err);
						}else{
							res.send('successfully upload');
						}
					})
	}else{
			res.send('incorrect email or password');
    }
			
});


router.post('/login',function(req,res){
		var email=req.body.email;
		var password=req.body.password;

	if(email.match(/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/)){
				con.user.findOne({email:email,password:password},function(err,existingUser){
					if(!existingUser){
						res.send('not found');
					}else{
						res.send('correct');
					}
				})
		}else{
				res.send('incorrect email');
			}
});



module.exports=router;