'use strict';

var express = require('express'),
      posts = require('./mock/posts.json');

var postLists = Object.keys(posts).map((value) => {
    return posts[value];
});

var app = express();

app.use('/static', express.static(__dirname + '/public'));

app.set('view engine', 'pug');
app.set('views', __dirname + '/templates');

app.get('/', (req, res) => {
    var path = req.path;
    // res.locals.path = path; Same as line 20
    res.render('index', {path: path});
});

app.get('/blog/:title?', (req, res) => {
    var title = req.params.title;
    if (title === undefined) {
        res.status(503);
        res.render('blog', {posts: postLists});
    } else {
        var post = posts[title] || {};
        res.render('post', {post: post});
    }
});

app.get('/posts', (req, res) => {
    if (req.query.raw) {
        res.json(posts);
    } else {
        res.json(postLists);
    }
});

app.listen(3000, () => {
    console.log("The frontend server is running on port 3000!");
});