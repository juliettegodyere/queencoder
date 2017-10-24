
var jwt         = require('jsonwebtoken');
var secret      = 'prisonbreak';
var User        = require('../models/user');

module.exports  = function(router) {

    //User's Routes
    router.post("/users",createUser);
    router.post("/authenticate", loginUser);
    router.post("/loggedInUserName", loggedInUserName);
    

    function createUser(req, res){
      var user = new User();
      user.username = req.body.username;
      user.email= req.body.email;
      user.password = req.body.password;
      user.name = req.body.name;

      if(req.body.username == null || req.body.username == "" ||req.body.password == null || req.body.password=="" ||req.body.email == null || req.body.email=="" ||req.body.name == null || req.body.name=="") {
        res.json({success:false, message:"Ensure username and password were provided"});
      }else{
        user.save(function(err,user){
          if(err){
            if(err.errors != null){
              if(err.errors.name){
                res.json({success:false, message: err.errors.name.message})
                }else if(err.errors.email){
                  res.json({success:false, message: err.errors.email.message})
                }else if(err.errors.username){
                  res.json({success:false, message: err.errors.username.message})
                }else if(err.errors.password){
                  res.json({success:false, message: err.errors.password.message})
                }else{
                  res.json({success:false, message: err})
                }
            }else if(err){
              if(err.code == 11000){
                  res.json({success:false, message: 'Duplicate Record: Username or Email already exist'});
              }  
            }else{
              res.json({success:false, message: err})
            }
            //res.json({success:false, message:" Username or password already exist"});
          }else{
              res.json({success:true, message: "User created"});
          }
        });
      }
    }

    function loginUser(req, res){
     User.findOne({username:req.body.username}, function(err, user){
      if(err) throw err;
        if(!user){
          res.json({
            success:false, 
            message:'Could not authenticate user' 
          })
        }else if(user){
          if(req.body.password){
            var validPassword = user.comparePassword(req.body.password);
          }else{
            res.json({success:false, message:"No password provided"})
          }
          if(!validPassword){
            res.json({success:false, message:"Could not authenticate password"})
          }else{
            var token = jwt.sign({username:user.username, email:user.email}, secret,{expiresIn:'24h'});
            res.json({success:true, message:"User authenticated", token:token})
          }
        }
     })
    }

 //Confirm that a user is logged in
  function loggedInUserName(req, res){
    var token = req.body.token || req.body.query || req.headers['x-access-token'];
    if(token){
         //verify token
        jwt.verify(token, secret, function(err, decoded){
          if(err){
            res.json({success:false, message:"Token Invalid"})
          }else{
            res.send(decoded);
          }
        })
    }else{
      res.json({success:false, message:"No token provided"})
    }

  };

    return router;
}


