const mysql = require("mysql");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const utils = require('../utils.js');
const db = utils.createDBConnection();



exports.login = async (req,res) => {
    try {

        const { email, password } = req.body;
        console.log(email);
        if(!email || !password) {
            return res.status(400).json({
                error: 'Please provide both an email and password'
            });
        }

        db.query(`SELECT * FROM users WHERE email = ?`,[email], async (error,results) => {
            console.log("SQL QUERY LOG" , results);
            if (error) throw error;
            
            
            else if (!results.length || !(await bcrypt.compare(password, results[0].password))) {
                console.log("comparison failed");
                return res.json({
                    message: 'Email or password is incorrect',
                    status: 401
                })
            }
            else if (!results[0].emailActive) {
                console.log("email is inactive");
                return res.json({
                    message: 'This email is currently inactive',
                    status: 401
                })
            }
            else {
                console.log("comparison passed");
                //JWT TOKEN
                const id = results[0].id;
                const role = results[0].role;
                const firstName = results[0].firstName;
                const lastName = results[0].lastName;
                const phone = results[0].phone;
                const email = results[0].email;
                const token = jwt.sign({ id: id, firstName: firstName, lastName: lastName, phone: phone, email: email, role: role }, 'supersecret');
                const userResponse = { id: results[0].id, firstName: results[0].firstName, lastName: results[0].lastName, phone: results[0].phone, email: results[0].email, role: role }
                console.log("token is: " + token);

                return res.json(userResponse)

            }
            


        })
    } catch(error) {
        console.log(error);
    }
}


exports.register = async (req,res) => {
    try {
        console.log('attempt to register')
        const { firstName, lastName, phone, password, email } = req.body;
        
        let hashedPassword = await bcrypt.hash(password, 8);
        let accountId = '1185106000019416001'; //this will be set from zoho account id that the user belongs to
        console.log(hashedPassword);
        db.query(`UPDATE users SET ? WHERE email = '${email}'`, {email: email, password: hashedPassword, accountId: accountId, firstName: firstName, lastName: lastName, phone: phone, emailActive: '1' }, (error) => {
            if(error) {
                console.log(error)
            } else {
                return res.status(200).json({
                    success: 'User registered'
                })
            }  
            
        });
    } catch(error) {
        console.log(error);
    }
}



exports.update = async (req,res) => {
    try {

        const { firstName, lastName, phone, password, email } = req.body;
        const emailId = req.body.email;
        let accountId = '1185106000019416001'; //this will be set from zoho account id that the user belongs to
        db.query(`UPDATE users SET ? WHERE email = '${emailId}'`, {accountId: accountId, firstName: firstName, lastName: lastName, phone: phone }, (error) => {
            
            if(error) {
                console.log(error)
            } else {
                return res.status(200).json({
                    success: 'User registered'
                })
            }  
            
        });
    } catch(error) {
        console.log(error);
    }
}

exports.forgot = async (req,res) => {
    try {

        const { email, password } = req.body;
        
        let hashedPassword = await bcrypt.hash(password, 8);
        let accountId = '1185106000019416001'; //this will be set from zoho account id that the user belongs to
        db.query('INSERT INTO users SET ?', {email: email, password: hashedPassword, accountId: accountId }, (error) => {
            if(error) {
                console.log(error)
            } else {
                return res.status(200).json({
                    message: 'User registered'
                })
            }  
            
        });
    } catch(error) {
        console.log(error);
    }
}

