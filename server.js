const express = require('express');
const mailgun = require('mailgun-js');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const DOMAIN = 'https://app.mailgun.com/app/sending/domains/sandboxae9e5aabb63a49f782555ba5a2a2a637.mailgun.org';
const mg = mailgun({apiKey: '8acd70a1f17c02ad27489f72359344af-fe9cf0a8-d97244ae', domain: DOMAIN});

app.post('/send', (req, res) => {
  const { name, email, message } = req.body;

  const data = {
    from: 'Excited User <mailgun@YOUR_DOMAIN_NAME>',
    to: 'target-email@example.com',
    subject: 'New Contact Form Submission',
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
  };

  mg.messages().send(data, (error, body) => {
    if (error) {
        console.log(error)
      return res.status(500).send(error.toString());
    }
    res.status(200).send('Email sent: ' + body.message);
  });
});

app.get("/", (req, res)=>{
    res.send("All is well")
});

app.listen(3001, () => {
  console.log('Server is running on port 3001');
});
