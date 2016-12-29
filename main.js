var express = require('express')
var app = express()
var fs = require('fs');
var cheerio = require('cheerio');
var mal = require('./mal.js')

app.use(express.static('.'));

app.get('/:username', function (req, res) {
    var username = req.params.username;
    var user = "Username: " + username;
    var result;
    var $ = cheerio.load(fs.readFileSync("index.html"));
    $('#username').attr('value', username).html();
    mal.randomAnime(function(result) {
        $('#result').html(result);
        res.send($.html())
    }, username);
});
app.listen(12345)
