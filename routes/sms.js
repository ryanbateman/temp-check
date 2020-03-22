const express = require('express');
const { urlencoded } = require('body-parser');
const MessagingResponse = require('twilio').twiml.MessagingResponse;

const app = express();
app.use(urlencoded({ extended: false }));
const router = express.Router();

class Update {
    constructor(message) {
        this.number = message.From;
        this.name = `~${message.From.slice(-4)}`;
        this.temp = message.Body;
        this.timestamp = new Date().toLocaleString("en-US");
    }
}

router.post('/', (req, res) => {
    const update = new Update(req.body);

    const twiml = new MessagingResponse();
    const message = twiml.message();
    message.body(`Updates:\n${update.name} - ${update.timestamp} - ${update.temp}`);

    res.writeHead(200, {'Content-Type': 'text/xml'});
    res.end(twiml.toString());
});

module.exports = router;
