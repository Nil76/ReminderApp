const express = require("express");
const bodyParser = require("body-parser");
const twilio = require("twilio");

const app = express();
const PORT = 5000;

// Twilio Credentials
const accountSid = 'AC7dfa9e79d10882dbd8650fc251d2a380';
const authToken = '1db23f71dc89b56272bf9651b4ba37ff';
const client = require('twilio')(accountSid, authToken);
client.messages
    .create({
        body: 'From CareerNaksha Reminder-App There is something in your Reminder list Please check',
        messagingServiceSid: 'MG5b486da4258118cf504facee9c92d479',
        to: '+917984123714'
    })
    .then(message => console.log(message.sid));

app.use(bodyParser.json());

// Endpoint to send SMS
app.post("/send-sms", (req, res) => {
  const { to, message } = req.body;

  client.messages
    .create({
      body: message,
      // eslint-disable-next-line no-undef
      from: twilioPhone,
      to: to, // Recipient's phone number
    })
    .then((message) => res.status(200).json({ success: true, sid: message.sid }))
    .catch((error) => res.status(500).json({ success: false, error: error.message }));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

