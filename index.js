var express = require('express');
var http = require('http');
var path = require('path');
var nodemailer = require('nodemailer')
var bodyParser = require('body-parser')
var app = express();
var server = http.Server(app);
const PORT = process.env.PORT || 8080;
const https = require('https');
app.set('port', 8080);
app.use('/res', express.static(__dirname + '/res'));
app.use('/css', express.static(__dirname + '/css'));
app.get('/', function (request, response) {
    response.sendFile(path.join(__dirname, 'index.html'));
});
server.listen(PORT, function () {
    console.log('Starting server on port ' + PORT);
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'pizza.hi.restaurant@gmail.com',
        pass: 'qvgifmxdzczgorxe'
    }
});

var mailOptions = {
    from: 'pizza.hi.restaurant@gmail.com',
    to: 'vanogus@gmail.com',
    subject: 'Уважаемый',
    text: 'Ваш запрос принят! Наш менеджер свяжется с вами в ближайшее время.'
};
function sendMail() {
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

app.post('/call_back', function (req, res) {
    console.log(req.body)
    mailOptions.to = req.body.mail
    mailOptions.subject = 'Уважаемый, ' + req.body.name
    sendMail();
});