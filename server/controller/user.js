
// define require module for app

var express=require('express');
var router=express.Router();
var con=require('../models/db');
var config = require('../config/config');


var jwt = require('jsonwebtoken');


console.log(con);
/*
 |--------------------------------------------------------------------------
 | signup
 |--------------------------------------------------------------------------
 */
router.post('/signup',function(req,res){

		var email=req.body.email;
		var password=req.body.password;
if(email.match(/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/)){
			var data=new con.User({email:email,password:password});
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



/*
 |--------------------------------------------------------------------------
 |Stroring project detail
 |--------------------------------------------------------------------------
 */
router.post('/project', function(req, res) {
    console.log(req.body);
    var projectName = req.body.pro;
    //	var password=req.body.password;
    console.log('projectName', projectName);

    // if(email.match(/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/)){
    var data = new con.project({
        projectName : projectName
    });
    console.log('projectcreated', projectName);
    data.save(function(err, user) {
            if (err) {
                res.send('project already available');
                //console.log(err);
            } else {
               con.project.find(function(err,result){
                 if(err){
                   res.send('data not prasent');
                 }
                 else{
                   res.send(result);
                 }
               
               })
              console.log("print user");
                // res.send(user);

            }
        })

});
/*
 |--------------------------------------------------------------------------
 | Login 
 |--------------------------------------------------------------------------
 */

router.post('/login',function(req,res){
		var email=req.body.email;
		var password=req.body.password;

	if(email.match(/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/)){
				con.User.findOne({email:email,password:password},function(err,existingUser){
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


/*
 |--------------------------------------------------------------------------
 | Login with GitHub
 |--------------------------------------------------------------------------
 */
// router.post('/auth/github', function(req, res) {
//
//    let clientId = req.body.clientId;
//    var token = jwt.sign(clientId, config.GITHUB_SECRET);
//    res.json({ token: token });
//
// });
//
//
// router.post('/verify', function(req, res) {
//     var token = req.body.token || req.query.token || req.headers['x-access-token'];
//     if (token) {
//         jwt.verify(token, config.GITHUB_SECRET, function(err, decoded) {
//             if (err) {
//                 res.json({
//                     success: false,
//                     message: 'failed to authenticate token'
//                 });
//             } else {
//                 res.json({
//                     message: 'successfully authentication process',
//                     result: decoded
//                 });
//             }
//         });
//     } else {
//         res.status(403).send({
//             success: false,
//             message: 'No token provide...'
//         });
//     }
// });

/*
 |--------------------------------------------------------------------------
 | Retriving project detail from mongo
 |--------------------------------------------------------------------------
 */
router.get('/retrive',function(req,res){
  con.project.find(function(err,projectRe){
      if (err) {
                res.send('project already available');
                //console.log(err);
            } 
               else{
                   res.send(projectRe);
                 }
               
            
              console.log("print user");
                // res.send(user);

            

  })
})
module.exports = router;
