var express = require('express')
var app = express();
var fs = require('fs');
var cheerio = require('cheerio');
var mal = require('./mal.js');

app.use(express.static('.'));

app.get('/:username', function (req, res) {
    let username = req.params.username;
    let $ = cheerio.load(fs.readFileSync("index.html"));
    $('#username').attr('value', username);
    mal.randomAnime(function(result) {
        $('#title').attr('href', result.animeURL).html(result.title);
        $('#img').attr('src', result.img);
        $('#score').html("Score: " + result.score + " rated by " + result.ratingCount + " users.");
        $('#description').html(result.description);
        $('#ranked').html("Ranked: " + result.ranked);
        $('#popularity').html("Popularity: " + result.popularity);
        $('#members').html("Members: " + result.members);
        $('#type').html("Type: " + result.type);
        $('#eps').html("Episodes: " + result.eps);
        if (result.aired !== "N/A") {
            $('#aired').html("Premiered: " + result.aired);
        } else {
            $('#aired').remove();
        }
        if (result.pv !== "N/A") {
            $('#pv').attr('src', result.pv);
        } else {
            $('#pv').remove();
        }
        res.send($.html())
    }, username);
});
app.listen(12345);
