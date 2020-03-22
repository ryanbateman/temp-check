const express = require('express');
const { urlencoded } = require('body-parser');
const HashMap = require('hashmap');
const MessagingResponse = require('twilio').twiml.MessagingResponse;

const app = express();
app.use(urlencoded({ extended: false }));

const router = express.Router();
var map = new HashMap();
const options = {timeZone: 'UTC',  timeZoneName: 'short'};

class Update {
    constructor(message) {
        this.number = message.From;
        this.name = `~${message.From.slice(-4)}`;
        this.temp = message.Body;
        this.timestamp = new Date().toLocaleString("en-US", options);
    }
}

router.post('/', (req, res) => {

    const newUpdate = new Update(req.body);
    map.set(newUpdate.number, newUpdate);

    const twiml = new MessagingResponse();
    const message = twiml.message();

    var responseText = `Updates:\n`;
    map.forEach(function (update, key) {
        if (key != update.number) {
            responseText += `${update.name} - ${update.timestamp} - ${update.temp}\n`
        }
    })
    message.body(responseText);

    res.writeHead(200, {'Content-Type': 'text/xml'});
    res.end(twiml.toString());
});

module.exports = router;
