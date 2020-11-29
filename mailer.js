var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'fractalsanta@gmail.com',
    pass: 'Fl@vour213'
  },
  tls: {
    rejectUnauthorized: false
}
});
var html = "<h3>ARM Swiss sample registration request</h3>";
html+="<h4>The following request was submitted via the site</h4>";
html+="Account Name: Louw Visagie<br />";
html+="Email: newusersemail@test.co.za<br />";
html+="Phone number: 123123<br />";
html+="<i>Please create the Account</i><br />";
html+="<p><b>Then, this is a sample link received by user after account creation:</b><br/>";
html+="<a href='http://localhost:4200/register/1185106000019416001'>User clicks this to confirm</a></p>"
var mailOptions = {
  from: 'fractalsanta@gmail.com',
  to: 'louw@geminisolution.co.za',
  subject: 'ARM Swiss registration request',
  html: html
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});