module.exports = {
    initAPI: function() {
        //Proposed configuration for API used by Angular app
        const ZCRMRestClient = require('zcrmsdk');
        const configJson = {
            "client_id": "1000.PSJ0Y9MV9HDXWG25V5JF5Q8929QJPH",
            "client_secret": "45435eb74026628b5dadb16d7b6cd0a3e5f6db3c7b",
            "redirect_url": "localhost:3000",
            "user_identifier": "tim@geminisolution.co.za",
            "mysql_username": "root",
            "mysql_password": "",
            "code": '1000.8ee7e8ba74e3d2a31bd1ffcfd6aa3f9b.fbb11798912e1554280415bfe9b1c6ae'//This is the code from the self client generation in the zoho dev console, also referred to as the grant token
        }

        //Always get token with scope  aaaserver.profile.READ, ZohoCRM.modules.All
        ZCRMRestClient.initialize(configJson).then(function (t)//Use ZCRMRestClient.initialize(configJson).then(function() for configuration array
        {
            console.log('Zoho Rest Client initialized');
        });

    },
    sendRegistrationEmail: function (formData) {
        var nodemailer = require('nodemailer');
        var params = JSON.stringify(formData);
        //console.log(formData, params)
        var transporter = nodemailer.createTransport({
          service: 'gmail',
          port: 587,
          auth: {
            user: 'css@armswissrep.com',
            pass: 'nksucjesbvympfex'
          },
          secure: false,
          requireTLS: true,
        });
        var html = "<h3 style='color:#044e82'>ARM Swiss sample registration request</h3>";
        html+="<h4 style='color:#044e82'>You have received confirmation to register this account</h4>";
        html+="Account Name: " + formData.fullName + "<br />";
        html+="Email: " + formData.email + "<br />";
        html+="Phone number: " + formData.phone + "<br />";
        html+="<i>Please create the Account</i><br /><br />";
        // html+="<p><b>Then, this is a sample link received by user after account creation:</b><br/>";
        // html+="<a href='http://localhost:4200/register/1185106000019416001'>User clicks this to confirm</a></p>"
        html+="<img  src='cid:unique@armswiss.com'/><br /><br />";
        
        var mailOptions = {
          from: 'css@armswissrep.com',
          to: 'css@armswissrep.com',
          subject: 'ARM Swiss registration request',
          html: html,
          attachments: [{
            filename: 'main_logo.png',
            path: __dirname + '/assets/main_logo.png',
            cid: 'unique@armswiss.com'
        }]
        };
        
        transporter.sendMail(mailOptions, function(error, info){
          if (error) {
            console.log(error);
          } else {
            console.log('Email sent: ' + info.response);
          }
        });
    },
    sendConfirmationEmail: function(emailstonotify) {
      var nodemailer = require('nodemailer');
      
        //console.log(formData, params)
        var transporter = nodemailer.createTransport({
          service: 'gmail',
          port: 587,
          auth: {
            user: 'css@armswissrep.com',
            pass: 'nksucjesbvympfex'
          },
          secure: false,
          requireTLS: true,
        });
        
        emailstonotify.forEach(email => {
          console.log(email);
          var html = "<h3>ARM Swiss sample registration</h3>";
          html+="<i>You have received confirmation to register this email address for ARM Swiss activation</i>";
          
          html+="<p><b>Please follow the link below to activate your account:</b><br/>";
          html+="<a href='http://armswissapp-env.eba-n8iawqcm.us-east-2.elasticbeanstalk.com/register/"+ email +"'>Click here</a></p>"
        
          var mailOptions = {
            from: 'fractalsanta@gmail.com',
            to: email,
            subject: 'ARM Swiss registration request',
            html: html
          };
          if(email) {
            transporter.sendMail(mailOptions, function(error, info){
              if (error) {
                console.log(error);
              } else {
                console.log('Email sent: ' + info.response);
              }
            });
          }
          
        });
        
    },
    sendContactEmail: function (formData) {
      var nodemailer = require('nodemailer');
      var params = JSON.stringify(formData);
      console.log(formData)
      var transporter = nodemailer.createTransport({
        service: 'gmail',
          port: 587,
          auth: {
            user: 'css@armswissrep.com',
            pass: 'nksucjesbvympfex'
          },
          secure: false,
          requireTLS: true,
      });
      
      
      var html = "<h3 style='color:#044e82'>ARM Swiss Allocator Request</h3>";
      
      html+="Allocator: " + formData.allocatorName + "<br />";
      html+="Address: " + formData.address + "<br />";
      html+="Contact Person: " + formData.contactPerson + "<br />";
      html+="Allocator Website: " + formData.website + "<br />";
      html+="Further Information: " + formData.furtherInformation + "<br /><br />";

      html+="<p style='color:#044e82';font-weight:bold'><b>Request sent from user:</b></p><br />";

      html+="Email Address: " + formData.email + "<br />";
      html+="Full Name(s): " + formData.firstName + " " + formData.lastName + "<br />";
      html+="Phone Number: " + formData.phone + "<br />";
      
      html+="<img  src='cid:unique@armswiss.com'/><br /><br />";
      var mailOptions = {
        from: 'fractalsanta@gmail.com',
        to: 'css@armswissrep.com',
        subject: 'ARM Swiss contact query',
        html: html,
        attachments: [{
          filename: 'main_logo.png',
          path: __dirname + '/assets/main_logo.png',
          cid: 'unique@armswiss.com'
      }]
        
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
  },
  sendForgotEmail: function (formData, userId) {
    console.log("UID:", userId)
    const jwt = require('jsonwebtoken');
    var nodemailer = require('nodemailer');
    var params = JSON.stringify(formData);
    //console.log(formData, params)
    var transporter = nodemailer.createTransport({
      service: 'gmail',
          port: 587,
          auth: {
            user: 'css@armswissrep.com',
            pass: 'nksucjesbvympfex'
          },
          secure: false,
          requireTLS: true,
    });
    let payload = { email: formData.email, userId:userId }
    let token =  jwt.sign(payload, 'secretKey');
    
    var html = "<h3 style='color:#044e82'>ASR Password Reset</h3>";
    html+="<p>You are receiving this because you (or someone else) have requested the reset of the password for your account.</p>";
    html+="<p>'Please click on the following link, or paste this into your browser to complete the process:</p>";
    html+="<p><a href='http://armswissapp-env.eba-n8iawqcm.us-east-2.elasticbeanstalk.com/reset/"+token+"'>http://armswissapp-env.eba-n8iawqcm.us-east-2.elasticbeanstalk.com/reset/"+token+"</a></p>"
    html+="<img  src='cid:unique@armswiss.com'/><br /><br />";
    var mailOptions = {
      from: 'fractalsanta@gmail.com',
      to: formData.email,
      subject: 'ARM Swiss Password Reset',
      html: html,
      attachments: [{
        filename: 'main_logo.png',
        path: __dirname + '/assets/main_logo.png',
        cid: 'unique@armswiss.com'
    }]
      
    };
    
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
        
      }
    });

    return true;
},
    createDBConnection: function () {
      const mysql = require('mysql');
    
      
      const db = mysql.createPool({
        
        // host: 'localhost',
        // user: 'root',
        // password: '',
        // database: 'zohooauth'
        host: process.env.RDS_HOSTNAME,
        user: process.env.RDS_USERNAME,
        password: process.env.RDS_PASSWORD,
        database: process.env.RDS_DBNAME,
        port: process.env.RDS_PORT,
        multipleStatements: true
      });
      
      return db;
    }
  };