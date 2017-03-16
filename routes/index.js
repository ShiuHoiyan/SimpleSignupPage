var express = require('express');
var crypto = require('crypto');
var User = require('../models/user');
var router = express.Router();

//加密
var getHashPassword = function (rawPassword) {
  var crypto = require('crypto');  
  var md5 = crypto.createHash('md5');  
  md5.update(rawPassword);  
  var result = md5.digest('hex');  
  return result;
}

module.exports = function() { 
    router.get('/', function(req, res) {
      if (!req.cookies.user && !req.query.username) {
        res.render('signin', {msg: ''});
      } else if (req.cookies.user && !req.query.username) {
        res.redirect('/?username=' + req.cookies.user);
      } else if (req.cookies.user == req.query.username) {
        User.findOne({username: req.cookies.user}, function(err, data) {
          obj = data;
          obj["error"] = "";
          res.render('detail', obj);
        });
      } else if (!req.cookies.user && req.query.username) {
        res.redirect('/');
      }else {
        User.findOne({username: req.cookies.user}, function(err, data) { 
            obj = data;
            obj["error"] = "Only able to access your own data!";
            res.render('detail', obj);
        });
      }
    });

    router.post('/', function(req, res) {
      var username = req.body.username;
      var password = req.body.password;
      User.findOne({username: username}, function(err, data) { 
            if (data) {
              //console.log(data.password);
              //console.log(password);
              if (data.password == getHashPassword(password)) {
                res.cookie('user',username, {maxAge:8640000000});
                res.redirect('/?username=' + username);
              } else {
                res.render('signin', {msg: 'Wrong Password!'});
              }
            } else {
              res.render('signin', {msg: 'User does not exist!'});
            }
      });
    });

    router.get('/logout', function(req, res) {
      res.clearCookie('user');
      res.redirect('/');
    });

    router.get('/regist', function(req, res) {
      res.render('signup', {error: ''});
    });

    router.post('/regist', function(req, res) {
      var arr = ['username', 'sid', 'phone', 'email'];
      var re = []; 
      User.find({"$or":[{username: req.body.username}, {sid: req.body.sid}, 
        {phone: req.body.phone}, {mail: req.body.mail}]}, function(err, users) {
          if (users.length != 0) {
            users.forEach(function(value) {
              arr.forEach(function(attr) {
                if (value[attr] == req.body[attr]) {
                  if (re.indexOf(attr) == -1) re.push(attr);
                }
              });
            });
          }
          if(re.length != 0) {
            res.send("registered " + re + " !");
          } else {
            newUser = new User({
              username: req.body.username,
              password: getHashPassword(req.body.password),
              sid: req.body.sid,
              phone: req.body.phone,
              email: req.body.email
            });
            newUser.save(function(err) {
              if (err) {
                console.log("注册失败: ", error);
                throw err
              }
              console.log("注册成功");
              res.cookie('user', req.body.username);
              res.send("注册成功");
            });

          }
      });
    });
    return router;
};
