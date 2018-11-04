
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const webpush = require("web-push");
const {retrieveTalks, retrieveTalkById} = require('./data/talks');
const {retrieveSpeakers} = require('./data/speakers');
const moment = require('moment');
const expressValidator = require('express-validator');
const compression = require('compression');
moment.locale('fr');
const app = express();
const subscriptions = [];
let talkSubscribers = new Map();
let notified = new Map();


const publicVapidKey =
    "BFwbGBPX9ggNKmMPMtn8a_eYfMaU28iGv8-fy8PwxoMPwZZQQKaq96RMTCBkdUvVDjgJPZ6wtBeZ2p2i09ZMihY";
const privateVapidKey = "-UfSss_RgRG9keikyYIjZYx1UTbUIdAf9yWPwqt_jTM";

webpush.setVapidDetails(
    "mailto:test@test.com",
    publicVapidKey,
    privateVapidKey
);

app.use(compression());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(expressValidator());

app.get('/api/talks', function (req, res) {
        retrieveTalks().then(data => {
            res.setHeader('Content-Type', 'application/json');
            res.json(data)
        })
    }
);

app.get('/api/speakers', function (req, res) {
        retrieveSpeakers().then(data => {
            res.setHeader('Content-Type', 'application/json');
            res.json(data)
        })
    }
);

app.post('/api/subscribe', function (req, res) {
    const subscription = req.body;
    if (subscriptions.filter(sub => sub && sub.endpoint && (sub.endpoint === subscription.endpoint)).length <= 0) {
        subscriptions.push(subscription);
    }
    res.json({});
});

app.post('/api/syncFavorites', function (req, res) {
    const subscription = req.body.subscription;
    // remove subscription from all previous talks
    const talks = req.body.talks;
    const _talkSubscribers =new Map();
   
    talkSubscribers.forEach((value, key)=>{
        const newVal= (value||[]).filter(sub => sub.endpoint !== subscription.endpoint);
        _talkSubscribers.set(key, newVal)
    })
    talkSubscribers = _talkSubscribers;
   
    // add subscription to new starred talks
    talks.forEach(talk => {
        let subscribers = talkSubscribers.get(talk.id) || [];
        let found = subscriptions.find(sub => sub.endpoint === subscription.endpoint);
        let newSubscribers=[...subscribers]
        if(found){
            newSubscribers.push(found);
        }
        talkSubscribers.set(talk.id, newSubscribers);
    });
    res.json({});
});

app.post('/api/syncRatings', function (req, res) {
    const ratings = req.body.ratings;
    res.json({});
});

app.post('/api/notify', function (req, res) {
    const talkId = req.body.talkId;
    const subscribers = talkSubscribers.get(talkId) || [];
    const alreadyNotified = notified.get(talkId)||[];
    console.log(`alreadyNotified[${talkId}] = ${alreadyNotified}`);
    console.log(`subscribers[${talkId}] = ${subscribers.map(_sub => _sub.endpoint)}`);
    Promise.all(subscribers
            .map(_sub => retrieveTalkById(talkId)
               .then(talk => {
                   console.log('_sub...', _sub);
                   const payload = JSON.stringify({
                      title: "Ce talk aura lieu 2m1 \\m/",
                       body: talk.title,
                       icon: '/images/logo.png',
                       data: {talkId: talk.id}
                   });
                   return webpush.sendNotification(_sub, payload)
                       .catch(err => console.error('err', err));
               })
        ))
        .then(() => res.json({}))
        .catch(error => console.log(error));
});


setInterval(() => {
    Promise.all([...talkSubscribers.keys()]
        .map(talkId => retrieveTalkById(talkId)
                .then(talk => {
                    const dueDate =  moment(talk.time, 'DD/MM/YYYY HH[h]mm');
                    const alreadyNotified = notified.get(talkId)||[];
                    if (moment().add(1, 'day').isBetween(dueDate, dueDate.add(1, 'day'))) {
                        return Promise.all(talkSubscribers.get(talkId)
                            .filter(_sub => alreadyNotified.indexOf(_sub.endpoint)<0)
                            .map(_sub => {
                                const payload = JSON.stringify({
                                    title: "Ce talk aura lieu 2m1 \\m/",
                                    body: talk.title,
                                    icon: '/images/logo.png',
                                    data: {talkId: talk.id}
                                });
                                notified.set(talkId, [...alreadyNotified, _sub.endpoint]);
                                return webpush.sendNotification(_sub, payload)
                                    .catch(err => console.error('err', err));
                            })
                        )
                    }
                    return Promise.resolve({})
                }).catch(error => console.log(error))
        )
    )
}, 3600 * 1000);


module.exports = app;
