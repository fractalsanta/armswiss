const express = require('express');
const router = express.Router();
const ZCRMRestClient = require('zcrmsdk');
const utils = require('../utils.js');
const url = require('url');
const _ = require('lodash');
const async = require('async');
const jwt = require('jsonwebtoken');
const eventController = require('../controllers/events-log');
router.get('/pdfsettings', (req, res) => {
    console.log(req.body)
    var query = url.parse(req.url, true).query;
    // var query = url_parts.query;
    const db = utils.createDBConnection();
    console.log(query);
    var accountId = query.accountId;

    console.log("Received request: /pdfsettings ");

    var sql = `SELECT * from pdfconfig`;

    console.log(sql);
    db.query(sql, function (err, result) {
        if (err) throw err;

        else if (!result.length) {
            return res.status(200).json({
                error: 'No PDF found for this account. Please contact the administrator.'
            });
        }
        else {
            console.log(result[0])
            return res.status(200).json({
                success: 'PDF settings returned',
                data: result[0]
            });
        }
    });
});

router.get('/webconfig', (req, res) => {
    console.log(req.body)
    var query = url.parse(req.url, true).query;
    // var query = url_parts.query;
    const db = utils.createDBConnection();
    console.log(query);
    var accountId = query.accountId;

    console.log("Received request: /webconfig ");

    var sql = `SELECT * from webconfig`;

    console.log(sql);
    db.query(sql, function (err, result) {
        if (err) throw err;

        else if (!result.length) {
            return res.status(200).json({
                error: 'No PDF found for this account. Please contact the administrator.'
            });
        }
        else {
            console.log(result[0])
            return res.status(200).json({
                success: 'Allocator View settings returned',
                data: result[0]
            });
        }
    });
});

router.post('/pdfsettings', (req, res) => {
    const db = utils.createDBConnection();
    var formData = req.body;

    var sql = `UPDATE pdfconfig SET allocatorName = ${formData.allocatorName},
    allocatorStreet = ${formData.allocatorStreet},
    allocatorCity = ${formData.allocatorCity},
    allocatorPostCode = ${formData.allocatorPostCode},
    allocatorProvince = ${formData.allocatorProvince},
    allocatorCountry = ${formData.allocatorCountry},
    allocatorPhone = ${formData.allocatorPhone},
    allocatorWebsite = ${formData.allocatorWebsite},
    allocatorAccountType = ${formData.allocatorAccountType},
    allocatorSummary = ${formData.allocatorSummary},
    allocatorAssetClass = ${formData.allocatorAssetClass},
    allocatorCSClassification = ${formData.allocatorCSClassification},
    allocatorCSRequirements = ${formData.allocatorCSRequirements},
    allocatorCSAdditionalInfo = ${formData.allocatorCSAdditionalInfo},
    allocatorRegulatory = ${formData.allocatorRegulatory}`;
    console.log(sql);

    db.query(sql, function (err, data) {
        if (err) throw err;
    });


    return res.status(200).json({
        success: "PDF Updated Successfully"
    });



});

router.post('/webconfig', (req, res) => {
    const db = utils.createDBConnection();
    var formData = req.body;

    var sql = `UPDATE webconfig SET allocatorName = ${formData.allocatorName},
    allocatorStreet = ${formData.allocatorStreet},
    allocatorCity = ${formData.allocatorCity},
    allocatorPostCode = ${formData.allocatorPostCode},
    allocatorProvince = ${formData.allocatorProvince},
    allocatorCountry = ${formData.allocatorCountry},
    allocatorPhone = ${formData.allocatorPhone},
    allocatorWebsite = ${formData.allocatorWebsite},
    allocatorAccountType = ${formData.allocatorAccountType},
    allocatorSummary = ${formData.allocatorSummary},
    allocatorAssetClass = ${formData.allocatorAssetClass},
    allocatorCSClassification = ${formData.allocatorCSClassification},
    allocatorCSRequirements = ${formData.allocatorCSRequirements},
    allocatorCSAdditionalInfo = ${formData.allocatorCSAdditionalInfo},
    allocatorRegulatory = ${formData.allocatorRegulatory}`;
    console.log(sql);

    db.query(sql, function (err, data) {
        if (err) throw err;
    });


    return res.status(200).json({
        success: "Allocator View Updated Successfully"
    });



});


router.post('/contact', (req, res) => {
    console.log('contact request')
    utils.sendContactEmail(req.body)
    res.send({ status: 'OK' });
})

router.post('/sendRegistration', (req, res) => {
    console.log('contact request')
    utils.sendRegistrationEmail(req.body)
    res.send({ status: 'OK' });
})

router.post('/event', (req, res) => {
    eventController.logEvent(req.body.eventName, req.body.details, req.body.userId)
    res.send({ status: 'OK' });
})
// router.get('/events', (req, res) => {
//     console.log('get event request')
//    // res.send(eventController.getUserEvents());
//     return res.status(200).json(eventController.getUserEvents());
// })

router.post('/forgot', (req, res, next) => {
    console.log('forgot request')
    const db = utils.createDBConnection();
    var formData = req.body;



    console.log('SQL');
    var sql = `SELECT * FROM users WHERE email = '${formData.email}' limit 1`;
    //console.log(sql);
    db.query(sql, function (err, result, next) {
        if (err) throw err;
        if (!result.length) {
            return res.status(200).json({
                error: 'No matching email found for this account. Please contact the administrator.'
            });
        }

        console.log('sending forgot email');
        if (utils.sendForgotEmail(formData, result[0].id)) {
            return res.status(200).json({
                success: 'OK'
            });
        };


    });



})

router.get('/users', (req, res) => {
    const db = utils.createDBConnection();

    var sql = `SELECT * FROM users`;
    //console.log(sql);
    db.query(sql, function (err, result) {
        if (err) throw err;

        
        else {
            return res.status(200).json(result);
        }
    });


});

router.get('/events', (req, res) => {
    const db = utils.createDBConnection();

    db.query('SELECT * FROM userevents', function (error,results) {
        if (error) throw error;
        
        else {
            //const userEvents = { userId: results[0].userId, eventId: results[0].eventId, description: results[0].description }
            
            return res.status(200).json(results)
            
        }
    });


});


module.exports = router