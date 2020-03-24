const admin = require('firebase-admin');

admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    databaseURL: 'https://temp-check-271617.firebaseio.com'
});
const db = admin.firestore();

module.exports = db;
