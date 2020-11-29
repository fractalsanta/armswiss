const express = require('express');
const router = express.Router();
const ZCRMRestClient = require('zcrmsdk');
const utils = require('../utils.js');
const url = require('url');
const _ = require('lodash');
const jwt = require('jsonwebtoken');
const authController = require('../controllers/auth');
const eventController = require('../controllers/events-log');
const cors = require('cors');
const bcrypt = require("bcryptjs");
const moment = require('moment');

router.post('/sendRegistration', (req, res) => {
    utils.sendRegistrationEmail(req.body)
    res.send({ status: 'OK' });
})

router.get('/accounts', (req, res) => {
    input = {};
    input.module = "Accounts";
    var params = {};
    params.page = 0;
    params.per_page = 5;
    input.params = params;
    //console.log(req.body);
    ZCRMRestClient.API.MODULES.get(input).then(function (response) {
        res.send(response.body);
    });
});
router.get('/accounts/:id', (req, res) => {
    input = {};
    input.module = "Accounts";
    var params = {};
    
    input.id = req.params.id;
    ZCRMRestClient.API.MODULES.get(input).then(function (response) {
        res.send(response.body);
    });

});
router.post('/accounts', (req, res) => {
    input = {};
    input.module = "Accounts";

    input.body = req.body;
    //console.log(input.body);
    ZCRMRestClient.API.MODULES.post(input).then(function (response) {
        res.send(response.body);
    });

});

router.get('/createLocalAccounts', (req, res) => {
    //console.log(req.body)
    var query = url.parse(req.url, true).query;
    // var query = url_parts.query;
    const db = utils.createDBConnection();
    //console.log(query);
    var accountId = query.id;
    var EMail_1 = query.EMail_1;
    var EMail_2 = query.EMail_2;
    var EMail_3 = query.Email_3;
    var Invoice_Status = query.Invoice_Status;
    var EMail_1_Active = query.EMail_1_Active;
    var EMail_2_Active = query.EMail_2_Active;
    var EMail_3_Active = query.EMail_3_Active;
    var expiryDate = query.Expiry_Date;
    var emailstonotify = [];

    emailstonotify.push(EMail_1, EMail_2, EMail_3);
    //console.log("Received request with Invoice Status: "+ Invoice_Status);
    console.log("received:", query,expiryDate)
   // var dateToCheck 
   // const isAtLeastADayAgo = moment().subtract(1,'days')>expiryDate;

    if (Invoice_Status === 'Paid' || Invoice_Status === 'Free Account') {

        utils.sendConfirmationEmail(emailstonotify);



        let sql = 'INSERT INTO users (email, accountId) VALUES ? ON DUPLICATE KEY UPDATE email=VALUES(email),  accountId=VALUES(accountId)';
        let params = [
            [EMail_1, accountId],
            [EMail_2, accountId],
            [EMail_3, accountId],
        ];

        //console.log(sql);

        db.query(sql, [params], function (err, data) {
            if (err) throw err;
        });


        return res.status(200).json({
            message: "create locals success"
        });
    } else {
       // console.log("Incorrect Invoice status")
    }
});


router.get('/updateAccounts', (req, res) => {
    

    //scenario in /createLocalAccounts to be mimicked at this route for rules supplied

    var query = url.parse(req.url, true).query;
    // var query = url_parts.query;
    const db = utils.createDBConnection();
    console.log(query);
    var accountId = query.accountId;
    
    console.log("Received request with Update Account Action: "+ accountId);


    var sql = `UPDATE users SET  emailActive = ${query.email1Active} WHERE email = '${query.email1}';`;
    sql+=`UPDATE users SET  emailActive = ${query.email2Active} WHERE email = '${query.email2}';`
    sql+=`UPDATE users SET  emailActive = ${query.email3Active} WHERE email = '${query.email3}';`
    //var sql = `UPDATE users SET ?
    //NOTE - has to deselect all emailactive fields in zoho as well
    // var sql = `UPDATE users SET  emailActive = false WHERE email = '${query.email1}';`;
    // sql+=`UPDATE users SET  emailActive = false WHERE email = '${query.email2}';`
    // sql+=`UPDATE users SET  emailActive = false WHERE email = '${query.email3}';`
    console.log(sql);

    db.query(sql, function (err, data) {
        if (err) throw err;
    });


    return res.status(200).json({
        message: "create locals success"
    });
});


router.post('/confirmRegistration', (req, res) => {
    const db = utils.createDBConnection();
    var formData = req.body;

    var sql = `SELECT * FROM users WHERE email = '${formData.email}'`;
    //console.log(sql);
    db.query(sql, function (err, result) {
        if (err) throw err;

        else if (!result.length) {
            return res.status(200).json({
                error: 'No matching email found for this account. Please contact the administrator.'
            });
        }
        else {
            var sql = `UPDATE users SET password = '${formData.password}', emailActive = '1' WHERE email = '${formData.email}'`;
            db.query(sql, function (err, data) {
                return res.status(200).json({
                    success: 'Password confirmed'
                });
            });
        }
    });


});

router.post('/userLogin', (req, res) => {
    const db = utils.createDBConnection();
    var formData = req.body;

    var sql = `SELECT * FROM users WHERE email = '${formData.email}' AND password = '${formData.password}'`;
    //console.log(sql);
    db.query(sql, function (err, result) {
        if (err) throw err;
        else if (!result.length) {
            return res.status(200).json({
                error: 'Your login details are incorrect. Please try again'
            });
        }
        else if (result[0].emailActive == '0') {
            return res.status(200).json({
                error: 'This Account is no longer active'
            });
        }
        else {
            let payload = { email: result[0].email, role: result[0].role }
            let token =  jwt.sign(payload, 'secretKey');
            return res.status(200).json({
                success: true,
                token: token, 
                role:  result[0].role
            });
        }
    });


});

router.post('/reset', (req, res) => {
    const db = utils.createDBConnection();
    var formData = req.body;
    const saltRounds = 10;
    const userPassword = formData.password;

    bcrypt.hash(userPassword, saltRounds, (err, hash) => {
        var sql = `UPDATE users SET password = '${hash}' WHERE id = '${formData.userId}'`;
            console.log(sql);
            db.query(sql, function (err, result) {
                if (err) throw err;
                return res.status(200).json({
                    success: 'Password updated'
                });
                
            });
      });

    


});

router.post('/login', cors(), authController.login);
router.post('/register', cors(), authController.register);
router.post('/update', cors(), authController.update);
router.post('/event', cors(), eventController.logEvent);
module.exports = router;