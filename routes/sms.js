const express = require('express');
const { urlencoded } = require('body-parser');
const MessagingResponse = require('twilio').twiml.MessagingResponse;

express.use(urlencoded({ extended: false }));
var router = express.Router();

class Update {
    constructor(message) {
        this.number = message.From;
        this.name = message.From;
        this.temp = message.Body;
        this.timestamp = Date.now();
    }
}

router.post('/', (req, res) => {
    var update = new Update(req.body);

    const twiml = new MessagingResponse();
    const message = twiml.message();
    message.body(`Updates: ${update.name} - ${update.timestamp} - ${update.temp}`);

    res.writeHead(200, {'Content-Type': 'text/xml'});
    res.end(twiml.toString());
});

module.exports = router;
