const express = require('express');
const { urlencoded } = require('body-parser');
const MessagingResponse = require('twilio').twiml.MessagingResponse;
const app = express();
const options = {timeZone: 'UTC',  timeZoneName: 'short'};
const admin = require('firebase-admin');


app.use(urlencoded({ extended: false }));
const router = express.Router();

const db = require('../database/database');
let updatesRef = db.collection('updates');

class IncomingMessage {
    static createFirestoreObject(message) {
        let data = {
            number: `${message.From}`,
            name: `~${message.From.slice(-4)}`,
            temp: message.Body,
            timestamp: admin.firestore.Timestamp.fromDate(new Date())
        }
        return data;
    }
}

router.post('/', (req, res) => {
    const twiml = new MessagingResponse();
    const message = twiml.message();
    const incomingMessage = IncomingMessage.createFirestoreObject(req.body);

    function updateWithLatestTemperature() {
        return db.collection('updates').doc(`${incomingMessage.number}`).set(incomingMessage);
    }

    function returnLatestUpdates() {
        // Christ on sale, this is skipping down 3 or 4 different asynchronous transport and data layers, Javascript is literally hell
        updatesRef.get()
            .then(documents => {
                var text = `Updates:\n`;
                documents.forEach(function (doc) {
                    if (incomingMessage.number != doc.get('id')) {
                        text += `${doc.get('name')} - ${doc.get('timestamp').toDate().toLocaleDateString("en-US", options)} - ${doc.get('temp')}\n`;
                    }
                });
                message.body(text);

                res.writeHead(200, {'Content-Type': 'text/xml'});
                res.end(twiml.toString());
            })
            .catch(err => {
                console.error('Error getting documents', err);
            });
    }

    updateWithLatestTemperature().then(ref => {
        returnLatestUpdates();
    })
    .catch(err => {
        console.error('Error updating document', err);
    });;

});

module.exports = router;
