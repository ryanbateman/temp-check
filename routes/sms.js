const express = require('express');
const MessagingResponse = require('twilio').twiml.MessagingResponse;

var router = express.Router();

router.post('/', (req, res) => {

    var body = req.body.Body;

    const twiml = new MessagingResponse();

    const message = twiml.message();
    message.body(`Your temperature is ${body}`);
    message.media('https://farm8.staticflickr.com/7090/6941316406_80b4d6d50e_z_d.jpg');

    res.writeHead(200, {'Content-Type': 'text/xml'});
    res.end(twiml.toString());
});

module.exports = router;
