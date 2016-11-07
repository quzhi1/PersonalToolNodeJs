function extractTitle(html) {
    console.log(html);
    var titleBegin = html.indexOf(".html\">") + ".html\">".length;
    var titleEnd = html.indexOf("<\/a>》");
    return html.substring(titleBegin, titleEnd);
}

function extractAuthor(html) {
    var pattern = /<div\s*class="suijijjzz">(.*)<a\s*href=(.*)>(.*)<\/a><\/div>\s*<div class="suijineirong">/g;
    var match = pattern.exec(html);
    if (match == null || match[1] == null || match[3] == null) {
        console.log("Failed to extract author");
        return '';
    } else {
        return match[1] + match[3];
    }
}

function createBody(html) {
    var pattern = /class="suijineirong">(.*)<\/div>\s*<div\s*class="seeall">/g;
    var match = pattern.exec(html);
    if (match == null || match[1] == null) {
        console.log("Failed to extract body");
    } else {
        var bodyArray = match[1].split('<br>');
        bodyArray.forEach(function (sentence) {
            $('#author').append('<p>' + sentence + '</p>');
        });
    }
}