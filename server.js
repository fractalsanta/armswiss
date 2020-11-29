//Proposed configuration for API used by Angular app
const express = require('express');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const app = express();
const bcrypt = require('bcrypt');
const PORT = 3000;
const mysql = require('mysql');

app.use(express.json())

const posts = [
    {
        username: 'louw',
        email: '',
        password: ''
    },
    {
        username: 'michaela',
        email: '',
        password: ''
    }
]

//Create db connection

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'zohooauth'
});

db.connect((err) => {
    if(err) throw err;

    console.log('mysql connected')
})

app.listen(PORT, function() {
    console.log('Server runnin on localhost: ', +PORT);
});

//Example DB QUERY
app.post('/users', async (req, res) => {
    const { email, password } = req.body
    console.log(req.body)

    db.query('SELECT * from users WHERE email = "' + email + '"', [email], async(error, result) => {
        
        if(error) return error;
        
        console.log(result);
        if(result) {
            if(result[0].password == req.body.password) {
                return res.status(200).json({ msg: "Login success" })
            } else {
                return res.status(401).json({ msg: "Invalid credentials" })
            }
               
        }
        
    })
});
//EXAMPLE TOKEN HANDLING
app.get('/posts', authenticateToken, (req, res) => {
    res.json(posts.filter(post => post.username === req.user.name));
});

app.post('/login', (req, res) => {
    const username = req.body.username;
    const user = { name: username }
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
    res.json({accessToken: accessToken})

});

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    
    if(token == null) return res.sendStatus(401);

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if(err) return res.sendStatus(403);
        
        req.user = user;
        next();

    })
}