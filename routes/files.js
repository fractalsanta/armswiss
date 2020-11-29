const express = require('express');
const router = express.Router();
const ZCRMRestClient = require('zcrmsdk');
const utils = require('../utils.js');
const url = require('url');
const async = require('async');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
router.use(cors());
var store = multer.diskStorage({
    destination: function(req,file,cb) {
        cb(null, './uploads');
    },
    filename:function(req,file,cb) {
        cb(null, file.originalname);
    }
});

var upload = multer({storage:store}).single('file');

router.post('/upload', (req, res,next) => {
    upload(req,res, function(err){
        if(err) {
            return res.status(501).json({error: err})
        }
        const db = utils.createDBConnection();
      //  'INSERT INTO users SET ?', {email: email, password: hashedPassword, accountId: accountId }
        db.query('INSERT INTO helpfiles SET ?',{fileName: req.file.filename, isActive: 1 }, (error) => {
            if (error) throw error;
            

        });
        return res.json({originalname:req.file.originalname, uploadname:req.file.filename})
    })
});

router.get('/', (req, res,next) => {
    const db = utils.createDBConnection();
    db.query('SELECT * FROM helpfiles', function (error,results) {
        if (error) throw error;
        
        if(results) {
            const helpFiles = { id: results[0].id, fileName: results[0].fileName, isActive: results[0].isActive }
            //console.log(helpFiles);
            return res.status(200).json(results);
        }

    });
});
router.get('/active', (req, res,next) => {
    const db = utils.createDBConnection();
    db.query(`SELECT * FROM helpfiles WHERE isActive = '1'`, function (error,results) {
        if (error) throw error;
        
        else {
           
            return res.status(200).json(results);
        }

    });
});
router.post('/', (req, res,next) => {
    const db = utils.createDBConnection();
    const { docId, isActive } = req.body;
    db.query(`UPDATE helpfiles SET ? WHERE id = '${docId}'`, { isActive: isActive }, (error) => {
        if (error) throw error;
        
        else {
            return res.status(200).json({
                success: 'File updated'
            })
        }

    });
});
router.post('/download', function(req, res,next) {
    
    filepath = path.join(__dirname, '../uploads') + '/' +req.body.filename;
    console.log("received request:", filepath)
    res.sendFile(filepath);
});

module.exports = router;