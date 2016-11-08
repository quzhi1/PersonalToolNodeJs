function extractTitle(html) {
    console.log(html);
    var titleBegin = html.indexOf(".html\">") + ".html\">".length;
    var titleEnd = html.indexOf("<\/a>》");
    return html.substring(titleBegin, titleEnd);
}

function extractAuthor(html) {
    var pattern = /<div\s*class="suijijjzz">([\s\S]*)<a\s*href=([\s\S]*)>([\s\S]*)<\/a><\/div>\s*<div class="suijineirong">/g;
    var match = pattern.exec(html);
    if (match == null || match[1] == null || match[3] == null) {
        console.log("Failed to extract author");
        return '';
    } else {
        return match[1] + match[3];
    }
}

function createBody(html) {
    var pattern = /class="suijineirong">([\s\S]*)\s*<\/div>\s*<div\s*class="seeall">/g;
    var match = pattern.exec(html);
    if (match == null || match[1] == null) {
        console.log("Failed to extract body");
    } else {
        var rawBody = match[1];
        var splitter;
        if (rawBody.includes("<br />")) {
            splitter = "<br />";
        } else if (rawBody.includes("<br>")) {
            splitter = "<br>";
        }
        var bodyArray = match[1].split(splitter);
        bodyArray.forEach(function (sentence) {
            $('#author').append('<p>' + sentence + '</p>');
        });
    }
}