// define require module for app

var express = require('express');
var router = express.Router();
var con = require('../models/db');

router.post('/signup', function(req, res) {
    var email = req.body.email;
    var password = req.body.password;
    if (email.match(/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/)) {
        var data = new con.user({
            email: email,
            password: password
        });
        data.save(function(err, data) {
            if (err) {
                res.send(err);
            } else {
                res.send('successfully upload');
            }
        })
    } else {
        res.send('incorrect email or password');
    }

});


router.post('/login', function(req, res) {
    var email = req.body.email;
    var password = req.body.password;
    if (email.match(/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/)) {
        con.user.findOne({
            email: email,
            password: password
        }, function(err, existingUser) {
            if (!existingUser) {
                res.send('not found');
            } else {
                res.send('correct');
            }
        })
    } else {
        res.send('incorrect email');
    }
});

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
              console.log("print user");
                res.send('successfully upload');

            }
        })
        
});


module.exports = router;
