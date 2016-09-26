
// define require module for app                   

var express=require('express');
var router=express.Router();
var con=require('../models/db');
var config = require('../config/config');
var request = require('request');
var moment = require('moment');
var jwt = require('jwt-simple');
var qs = require('querystring');

console.log(con);
router.post('/signup',function(req,res){
	
		var email=req.body.email;
		var password=req.body.password;
		

	if(email.match(/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/)){
			var data=new con.User({email,password});
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
 | Generate JSON Web Token
 |--------------------------------------------------------------------------
 */
function createJWT(user) {
  var payload = {
    sub: user._id,
    iat: moment().unix(),
    exp: moment().add(14, 'days').unix()
  };
  
  return jwt.encode(payload, config.TOKEN_SECRET);
}

/*
 |--------------------------------------------------------------------------
 | Login with GitHub
 |--------------------------------------------------------------------------
 */
router.post('/auth/github', function(req, res) {
  
  var accessTokenUrl = 'https://github.com/login/oauth/access_token';
  var userApiUrl = 'https://api.github.com/user';
  var params = {
    code: req.body.code,
    client_id: req.body.clientId,
    client_secret: config.GITHUB_SECRET,
    redirect_uri: req.body.redirectUri
  };
 console.log(params)
  // Step 1. Exchange authorization code for access token.
  request.get({ url: accessTokenUrl, qs: params }, function(err, response, accessToken) {
    accessToken = qs.parse(accessToken);
    var headers = { 'User-Agent': 'Satellizer' };
           console.log('existingUser',headers,'accessToken',accessToken)
    // Step 2. Retrieve profile information about the current user.
    request.get({ url: userApiUrl, qs: accessToken, headers: headers, json: true }, function(err, response, profile) {
        
      // Step 3a. Link user accounts.
      if (req.header('Authorization')) {
        console.log(req.header)
       	con.User.findOne({ github: profile.id }, function(err, existingUser) {
           console.log('existingUser',existingUser)
          if (existingUser) {
            return res.status(409).send({ message: 'There is already a GitHub account that belongs to you' });
          }
          var token = req.header('Authorization').split(' ')[1];
          var payload = jwt.decode(token, config.TOKEN_SECRET);
          console.log(payload);

          	con.User.findById(payload.sub, function(err, user) {
              console.log(user)
            if (!user) {
              return res.status(400).send({ message: 'User not found' });
            }
            user.github = profile.id;
            user.picture = user.picture || profile.avatar_url;
            user.displayName = user.displayName || profile.name;
            user.save(function() {
              var token = createJWT(user);
              res.send({ token: token });
            });
          });
        });
      } else {
        // Step 3b. Create a new user account or return an existing one.
       	con.User.findOne({ github: profile.id }, function(err, existingUser) {
          if (existingUser) {
            var token = createJWT(existingUser);
            return res.send({ token: token });
          }
          var user = new con.User();
          user.github = profile.id;
          user.picture = profile.avatar_url;
          user.displayName = profile.name;
          user.email = profile.email;
          console.log(user)
          user.save(function() {
            var token = createJWT(user);
            res.send({ token: token });
          });
        });
      }
    });
  });
});

module.exports=router;