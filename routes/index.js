var express = require('express');
var router = express.Router();
var request = require('request');
var csv = require('fast-csv');

// Load Image Lookup Table
var imageLookupTable = {};
csv.fromPath('public/resources/TitleLookupTableFile.csv')
    .on('data', function (data) {
        imageLookupTable[data[0].trim().slice(0, -4)] = data[2];
    })
    .on('end', function () {
        console.log('Loading TitleLookupTableFile complete!');
    });

// GET home page.
router.get('/', function (req, res, next) {
    res.render('index', {title: '屈直个人工具'});
});

// Get Auto Poet page
router.get('/auto-poet', function (req, res, next) {
    var contentBody = '<h2>《<a href="/chaxun/list/234352.html">补乐歌十首·咸池</a>》</h2> <div class="suijijjzz">年代:唐 作者: <a href="/chaxun/zuozhe/167.html" title="元结的诗全集">元结</a></div> <div class="suijineirong">元化油油兮，孰知其然。至德汩汩兮，顺之以先。<br>元化浘浘兮，孰知其然。至道泱泱兮，由之以全。</div> <div class="seeall"><a href="/chaxun/list/234352.html">查看全部</a></div>';
    res.render('autoPoet', {
        title: '自动吟诗器',
        content: contentBody
    });
    // var url = 'http://www.shicimingju.com/chaxun/shicirand/';
    // request(url, function (error, response, body) {
    //     if (!error && response.statusCode === 200) {
    //         // contentBody = body;
    //         contentBody = '<h2>《<a href="/chaxun/list/234352.html">补乐歌十首·咸池</a>》</h2> <div class="suijijjzz">年代:唐 作者: <a href="/chaxun/zuozhe/167.html" title="元结的诗全集">元结</a></div> <div class="suijineirong">元化油油兮，孰知其然。至德汩汩兮，顺之以先。<br>元化浘浘兮，孰知其然。至道泱泱兮，由之以全。</div> <div class="seeall"><a href="/chaxun/list/234352.html">查看全部</a></div>';
    //     } else {
    //         contentBody = url + " 错误。请联系作者quzhi65222714@gmail.com"
    //     }
    //     res.render('autoPoet', {
    //         title: '自动吟诗器',
    //         content: contentBody
    //     });
    // });
});

router.get('/chinese-map', function (req, res, next) {
    res.render('chinese-map', {
        title: '交互中国历史地图',
        imageLookupTableJson: JSON.stringify(imageLookupTable)
    });
});

module.exports = router;
