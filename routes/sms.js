const express = require('express');
const MessagingResponse = require('twilio').twiml.MessagingResponse;

var router = express.Router();

class Update {
    constructor(body) {
        this.number = body.from;
        this.name = body.from;
        this.temp = body.body;
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
