
//var Contact     = require('../models/contactModel');
var config      = require('../../config/contactConfig');

module.exports  = function(router) {

  //email settings
  router.post("/getContacts", getEmailSettings);
  
 function getEmailSettings(req,res){
    var mailgun = require('mailgun-js')({apiKey: config.api_key, domain: config.domain});
    console.log(req.body);
    var data = {
      from: 'Mailgun Mails from my website' + config.mailGunEmailAddress,
      to: config.myEmailAddress,
      subject: req.body.name + " " + "sent you a message",
      html: "<b style='color:green; font-size:20px;'>Message:</b><br/>"+req.body.message
    };

    if(req.body.name =='' || req.body.name == null || req.body.message ==''||req.body.message == null){
      res.json({success:false, message:"Fields Empty"});
    }else{
      mailgun.messages().send(data, function (error, body) {
        console.log(body);
        if(!error){
          res.json({success:true, message:"Message sent successfully"});
        }else{
          res.json({success:false, message:"Message not sent. Please try again later"});
        }
      });
    }
  };

    return router;
}


