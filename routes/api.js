const express = require('express');
const jwt = require('jsonwebtoken')
const router = express.Router();
const ZCRMRestClient = require('zcrmsdk');
const utils = require('../utils.js');
router.use(express.json());
const url = require('url');
const _ = require('lodash');

router.get('/', (req, res) => {
    res.send('from API route');
});
router.post('/sendRegistration', (req, res) => {
    utils.sendRegistrationEmail(req.body)
    res.send({ status: 'OK' });
})

router.post('/tokens', (req, res) => {
    res.send('from API route /token');
})

router.get('/tokens', (req, res) => {
    return res.status(200).json({
        access_token: req.app.locals.access_token,
        refresh_token: req.app.locals.refresh_token
    })
});

module.exports = router