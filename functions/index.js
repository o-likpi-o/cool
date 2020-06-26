const functions = require('firebase-functions');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');
const config = require('./mailconfig.json')
const request = require('request');
const cors = require("cors")({
  origin: true
});
admin.initializeApp();

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: config.email,
    pass: config.password
  }
});

exports.emailMessage = functions.https.onRequest((req, res) => {
  const { name, phone, description, email } = req.query;
  cors(req, res, () => {

    const mailOptions = {
      to: 'ks.maiba@gmail.com',
      from: "tectum-client@email.com",
      subject: `${name} хочет связаться с Вами`,
      text: 'text',
      html: `<div>
      <h4>Клиент</h4>
      <ul>
        <li>
          Имя - ${name || ""}
        </li>
        <li>
          Email - ${email || ""}
        </li>
        <li>
          Phone - ${phone || ""}
        </li>
      </ul>
      <h4>Дополнительная информация</h4>
      <p>${description || ""}</p>
    </div>`
    };

    var dataString = JSON.stringify({auth_token: config.viber["bot-id"], receiver: config.viber["user-id"], type: "text", sender: {name: "Виртуальный менеджер"}, text: `• Имя - ${name || ""}\r\n• Email - ${email || ""}\r\n• Номер - ${phone || ""}\r\n• Дополнительная информация: ${description || ""}`});
    var backupUserData = JSON.stringify({auth_token: config.viber["bot-id"], receiver: config.viber["secondUser-id"], type: "text", sender: {name: "Виртуальный менеджер"}, text: `• Имя - ${name || ""}\r\n• Email - ${email || ""}\r\n• Номер - ${phone || ""}\r\n• Дополнительная информация: ${description || ""}`});
    var options = {
      url: 'https://chatapi.viber.com/pa/send_message',
      method: 'POST',
      body: dataString,
      headers: {'content-type' : 'application/json'}
    };
    var backupOptions ={
      url: 'https://chatapi.viber.com/pa/send_message',
      method: 'POST',
      body: backupUserData,
      headers: {'content-type' : 'application/json'}
    };

    function callback(error, response, body) {
      if (!error && response.statusCode === 200) {
        request(backupOptions);
        res.status(200).send({
          message: "success"
        })
      }else{
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.log(error.message);
          }
          res.status(200).send({
            message: "success"
          })
        });
      }
    }
    return request(options, callback);
  })
});