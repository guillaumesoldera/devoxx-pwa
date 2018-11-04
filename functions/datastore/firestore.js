const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);
const db = admin.firestore();
const settings = {timestampsInSnapshots: true};
db.settings(settings);

module.exports = db;