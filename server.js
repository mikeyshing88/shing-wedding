const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const app = express();

app.set("port", process.env.PORT || 3001);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/dist'));
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/api/rsvp', (req, res) => {
  nodemailer.createTestAccount((err, account) => {
    const html = `<h1>${req.body.response}</h1>`;

    const transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      auth: {
        user: 'jh3loxqsnvjma5kd@ethereal.email',
        pass: '2vHmQDw7dBFNkxmPQc'
      }
    });

    const options = {
      from: 'michael@shing.com',
      to: 'mikeyshing88@hotmail.com',
      subject: 'New wedding RSVP reponse!',
      text: req.body.guest,
      html: html
    };

    transporter.sendMail(options, (err, info) => {
      if (err) {
        return console.log(err);
      };

      console.log(info.message);
      console.log('dd', nodemailer.getTestMessageUrl(info));
    })
  })
});

app.listen(app.get("port"), () => {
  console.log(`Find the server at: http://localhost:${app.get("port")}/`); // eslint-disable-line no-console
});