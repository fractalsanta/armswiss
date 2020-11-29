const express = require('express');
const mysql = require("mysql");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const utils = require('../utils.js');
const db = utils.createDBConnection();
const router = express.Router();

exports.logEvent = async (eventName, details, userId) => {
    let detailsToLog = details;
    if(typeof details == 'object') {
        detailsToLog = details.join(' ');
    }
    
        db.query('SELECT * FROM events WHERE eventName = ?',[eventName], async (error,results) => {
            if (error) throw error;
            else if (!results) {
                console.log("no event found failed");
                return false;
            } else {
                console.log(results[0]);
                db.query(`INSERT INTO userevents  SET ?`, {eventId: results[0].eventName, email: userId, eventDate: 'NOW()', description:detailsToLog}, (error) => {
                    if(error) {
                        console.log(error)
                    } else {
                        return true;
                    }  
                    
                });
            }
        });
    };

    exports.getUserEvents = async (req, res) => {
       
            db.query('SELECT * FROM userevents', async (error,results) => {
                if (error) throw error;
                
                else {
                    const userEvents = { userId: results[0].userId, eventId: results[0].eventId, description: results[0].description }
                    console.log(userEvents);
                    return userEvents;
                }
            });
        };
    
//     module.exports = router;
//     catch(error) {
//         console.log(error);
//     }
// }
// }