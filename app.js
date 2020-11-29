//Proposed configuration for API used by Angular app
const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();

app.get('/api', (req, res) => {
  res.json({
    message: 'Welcome to the API'
  });
});

app.post('/api/posts', verifyToken, (req, res) => {  
  jwt.verify(req.token, 'secretkey', (err, authData) => {
    if(err) {
      res.sendStatus(403);
    } else {
      res.json({
        message: 'Post created...',
        authData
      });
    }
  });
});

app.post('/api/login', (req, res) => {
  // Mock user
  const user = {
    id: 1, 
    username: 'brad',
    email: 'brad@gmail.com'
  }

  jwt.sign({user}, 'secretkey', { expiresIn: '30s' }, (err, token) => {
    res.json({
      token
    });
  });
});

// FORMAT OF TOKEN
// Authorization: Bearer <access_token>

// Verify Token
function verifyToken(req, res, next) {
  // Get auth header value
  const bearerHeader = req.headers['authorization'];
  // Check if bearer is undefined
  if(typeof bearerHeader !== 'undefined') {
    // Split at the space
    const bearer = bearerHeader.split(' ');
    // Get token from array
    const bearerToken = bearer[1];
    // Set the token
    req.token = bearerToken;
    // Next middleware
    next();
  } else {
    // Forbidden
    res.sendStatus(403);
  }

}

app.listen(5000, () => console.log('Server started on port 5000'));

//Zoho CRM token init and refresh example - to be refactored
// Refer to https://www.zoho.com/crm/developer/docs/server-side-sdks/node-js.html
var ZCRMRestClient = require('zcrmsdk');
const fs = require('fs');

var configJson = {
    "client_id": "1000.PSJ0Y9MV9HDXWG25V5JF5Q8929QJPH",
    "client_secret": "45435eb74026628b5dadb16d7b6cd0a3e5f6db3c7b",
    "redirect_url": "localhost:3000",
    "user_identifier": "tim@geminisolution.co.za",
    "mysql_username": "root",
    "mysql_password": "DBPassword",
    "code": "1000.0929ed06f396cf0abdc3db6faabffbb1.fd086337c0683c5677786cf4c0e61b63" //This is the code from the self client generation in the zoho dev console, also referred to as the grant token
}
//NOTE: scope aaaserver.profile.READ, ZohoCRM.modules.All has to be added to the self client token scope
var configArr = ZCRMRestClient.initialize(configJson).then(function (t)//Use ZCRMRestClient.initialize(configJson).then(function() for configuration array
{
    //Once the init is done, do whatever
})
