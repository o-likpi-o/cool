const functions = require('firebase-functions');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');
const config = require('./mailconfig.json')
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
    
    return transporter.sendMail(mailOptions, (error, info) => {
     if(error){
        console.log(error.message);
     }
     res.status(200).send({
       message: "success"
     })
    });
  })
});