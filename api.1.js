//Proposed configuration for API used by Angular app
const express = require('express');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const cors = require('cors');
const router = express.Router();
const api = require('./routes/api');
const ZCRMRestClient = require('zcrmsdk');
const fs = require('fs');

var refresh_token = '';
const app = express();
var token = app.get('access_token');
const PORT = 3030;
app.use(cors());

app.use(express.json());

const utils = require('./utils.js');
const allocatorsRouter = require('./routes/allocators');
const accountsRouter = require('./routes/accounts');
const adminRouter = require('./routes/admin');
app.use('/allocators', allocatorsRouter);
app.use('/accounts', accountsRouter);
app.use('/admin', adminRouter);

if(!app.get('access_token')) {
    utils.initAPI();
}
app.listen(PORT, function() {
    console.log('Server runnin on localhost: ', +PORT);
});
 