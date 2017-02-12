var request = require('request'),
    cheerio = require('cheerio');

exports.randomAnime = function(callback, username) {
    let MALinfo = "https://myanimelist.net/malappinfo.php?u=" + username + "&status=all&type=anime";
    const status = "2";
    let ids = [];
    request(MALinfo, function(error, response, body) {
        let $ = cheerio.load(body, {xmlMode: true});
        $('anime').each(function () {
            if ($(this).find('my_status').text() === status) {
                ids.push($(this).find('series_animedb_id').text());
            }
        });
        if (ids.length > 0) {
            let i = Math.floor((Math.random() * ids.length));
            var resultID = ids[i];
        }
        let animeURL = "https://myanimelist.net/anime/" + resultID;
        request(animeURL, function (error, response, body) {
            let $$ = cheerio.load(body);
            let title = $$('.ac').first().attr('alt');
            let img = $$('.ac').first().attr('src');
            let score = $$('[itemprop="ratingValue"]').text();
            let description = $$('[itemprop="description"]').text();
            let ranked = $$('strong', '.numbers.ranked').text();
            let popularity = $$('strong', '.numbers.popularity').text();
            let members = $$('strong', '.numbers.members').text();
            let ratingCount = $$('[itemprop="ratingCount"]').text();
            let eps = $$('.spaceit:contains("Episodes")').first().text().trim().replace('Episodes:', '').trim();
            let pv = 'N/A';
            if ($$('.video-promotion').length) {
                pv = `${$$('.video-promotion a').attr('href').substring(0, $$('.video-promotion a').attr('href').indexOf('?'))}`
            }
            let type = "N/A";
            if ($$('a[href^="https://myanimelist.net/topanime.php?type="]').length) {
                type = $$('a[href^="https://myanimelist.net/topanime.php?type="]').first().text();
            }
            let aired = "N/A";
            if ($$('a[href^="https://myanimelist.net/anime/season/"]').length) {
                aired = $$('a[href^="https://myanimelist.net/anime/season/"]').first().text();
            }
            let result = {
                animeURL: animeURL,
                title: title,
                img: img,
                score: score,
                description: description,
                ranked: ranked,
                popularity: popularity,
                members: members,
                ratingCount: ratingCount,
                type: type,
                eps: eps,
                aired: aired,
                pv: pv
            };
            callback(result);
        });
    });
};
