var request = require('request'),
    cheerio = require('cheerio');

var username;
var MALinfo;
var status;
var series_titles;

exports.randomAnime = function(callback, username) {
    MALinfo = "https://myanimelist.net/malappinfo.php?u=" + username + "&status=all&type=anime";
    status = "2";
    series_titles = [];
    request(MALinfo, function(err, resp, body) {
        var $ = cheerio.load(body, {xmlMode: true});
        $('anime').each(function () {
            if ($(this).find('my_status').text() === status) {
                series_titles.push($(this).find('series_title').text());
            }
        });
        if (series_titles.length > 0) {
            var i = Math.floor((Math.random() * series_titles.length));
            var result = series_titles[i];
            console.log("Result: " + result);
        } else {
            console.log("No results found.")
        }
        callback(result);
    })
};
