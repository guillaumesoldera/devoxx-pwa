
const express = require('express');
const bodyParser = require('body-parser');
const webpush = require("web-push");
const moment = require('moment');
moment.locale('fr');
const expressValidator = require('express-validator');
const compression = require('compression');
const { addAuthor, logAuthor, allAuthors, updateAuthor } = require('./datastore/authors');
const { addPost, updatePost, allPosts } = require('./datastore/posts');
const { addComment, allComments } = require('./datastore/comments');

const app = express();
const publicVapidKey = "BFwbGBPX9ggNKmMPMtn8a_eYfMaU28iGv8-fy8PwxoMPwZZQQKaq96RMTCBkdUvVDjgJPZ6wtBeZ2p2i09ZMihY";
const privateVapidKey = "-UfSss_RgRG9keikyYIjZYx1UTbUIdAf9yWPwqt_jTM";
webpush.setVapidDetails(
    "mailto:test@test.com",
    publicVapidKey,
    privateVapidKey
);

app.use(compression());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(expressValidator());

app.post('/api/subscribe', function (req, res) {
    const subscription = req.body;
    res.json({});
});

app.post('/api/signup', async (req, res) => {
    const body = req.body;
    const addedUser = await addAuthor(body.email, body.password);
    res.json(addedUser);
});

app.post('/api/login', async (req, res) => {
    const body = req.body;
    const loggedUser = await logAuthor(body.email, body.password);
    if (loggedUser) {
        res.json(loggedUser);
    } else {
        res.statusCode = 401;
        res.send('None shall pass')
    }
});

app.post('/api/syncPosts', async (req, res) => {
    const postsToSync = req.body;
    await Promise.all(postsToSync.map(post => {
        // to calculate address
        console.log('syncing post ', post)
        return addPost({...post, location:'not calcutaled'});
    }))
    const posts = await allPosts();
    res.json(posts);
});

app.get('/api/authors', async (req, res) => {
    const authors = await allAuthors();
    res.json(authors);
});

app.get('/api/posts', async (req, res) => {
    const posts = await allPosts();
    res.json(posts);
});

app.get('/api/comments', async (req, res) => {
    const comments = await allComments();
    res.json(comments);
});

app.get('/api/mocks', async (req, res) => {
    const author1 = await addAuthor('test@test', 'pass')
    await updateAuthor(author1.authorId, 'Jean mich', 'Bonjour je m\'aplle Jean michel et j\'aime le métal', 'https://randomuser.me/api/portraits/men/3.jpg')

    const post1 = await addPost({
        authorId: author1.authorId,
        date: '19 Oct 2018.',
        location: 'Awesome Bar',
        text: 'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo',
        picture: 'https://www.gannett-cdn.com/-mm-/89934f7b13e7717eb560f3babda84f20895abcd0/c=83-0-724-482/local/-/media/2018/07/17/DetroitFreeP/DetroitFreePress/636674313628993565-GettyImages-684133728.jpg?width=534&height=401&fit=crop'
    })
    const post2 = await addPost({
        authorId: author1.authorId,
        date: '20 Oct 2018.',
        location: 'Awesome Bar',
        text: 'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo',
        picture: 'https://www.gannett-cdn.com/-mm-/89934f7b13e7717eb560f3babda84f20895abcd0/c=83-0-724-482/local/-/media/2018/07/17/DetroitFreeP/DetroitFreePress/636674313628993565-GettyImages-684133728.jpg?width=534&height=401&fit=crop'
    })

    await addComment({
        postId: post1.postId,
        authorId: author1.authorId,
        date: '19 Oct 2018.',
        text: 'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo',
    })
    await addComment({
        postId: post1.postId,
        authorId: author1.authorId,
        date: '02 Nov 2018.',
        text: 'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo',
    })
    res.json({ sate: 'ok' });
});

module.exports = app;