const kanjiName = '岩淵勇樹';

const siteLi = {
  // 動画サイト
  "com__youtube": {
    "url": "https://www.youtube.com/watch?v=_-1BeTJAbns",
    "width": 960,
    "height": 1600,
    "target": "#player-api",
    // "remove": {
    // }
    "replace": {
      "#eow-title": "地球というメディアにおける2016年間",
      ".yt-thumb-clip": `<img src="../img/icon-square.jpg" width="48" height="48"><span class="vertical-align"></span>`,
      "#watch-header .yt-user-info a": `${kanjiName}`,
      ".watch-time-text": _.template('<%= recent_moment.format("YYYY/M/D") %>に公開'),
    },
  },
  // "jp__nicovideo": {
  //   "url": "http://www.nicovideo.jp/watch/sm1208573",
  //   "width": 960,
  //   "height": 1600,
  //   "target": '#nicoplayerContainer',
  // },

  // ニュースサイト
  "jp__or__nhk": {
    "url": "http://www3.nhk.or.jp/news/html/20160420/k10010489771000.html",
    "width": 1280,
    "height": 1600,
    "target": "#news_image_div img",
    "desc": "#news_textbody",
    "replace": {
      ".no-js .detail .detail-no-js .module--header .contentTitle": _.template('<%= title %>'),
      "#news_date": _.template('<%= start_moment.format("M月D日") %>'),
      "#news_time": _.template('<%= start_moment.format("H時m分") %>'),
    },
    "style": `
      .header-top .header-logo img {
        width: 287px;
        height: 26px;
      }

      .no-js .detail .detail-no-js #news_image_div img {
        width: 640px !important;
        height: 380px !important;
        margin-bottom: 20px;
      }
    `,
  },
  "com__asahi": {
    "url": "http://www.asahi.com/articles/DA3S12308696.html",
    "width": 960,
    "height": 1600,
    "target": ".ImagesMod",
    "desc": "#Main #MainInner .ArticleText p:first-child",
    "replace": {
      "#Main #MainInner .ArticleTitle .Title h1": _.template('<%= title %>'),
      "#Main #MainInner .ArticleTitle .Title .LastUpdated": _.template('<%= start_moment.format("YYYY年M月D日HH時mm分") %>'),
      "#Sub #SubInner #RnaviShimen .ListBlock li dl dt span.Sub > a": _.template('<%= recent_moment.format("YYYY年MM月DD日") %>'),
      "#Main #MainInner .ArticleBody .AdMod": `<div style="width:300px; height:300px; background: url(../img/ad-creative.jpg) center center; background-size: cover"></div>`,
      "#Sub #SubInner .Section .Ad": `<div style="width:300px; height:250px; background: url(../img/ad-adventure.jpg) center center; background-size: cover"></div>`,
    },
    "style": `
      #Main #MainInner .ArticleBody .ImagesMod {
        margin-bottom: 20px;
      }
    `,
  },
  "net__gigazine": {
    "url": "http://gigazine.net/news/20160418-wow-signal-suspicious-comets/",
    "width": 960,
    "height": 1600,
    "target": '#article .cntimage img',
    "desc": '#article .cntimage .preface br:nth-of-type(3)',
    "desc_position": "after",
    "remove": {
      "#article .cntimage .yeartime": true,
      "#article .cntimage .preface small:first-of-type": true,
    },
    "replace": {
      "#article .cntimage .title": _.template('<%= title %>'),
      "#TC": `<div style="width:728px; height:90px; background: url(../img/ad-creative-adventure.jpg) center center; background-size: cover"></div>`,
    },
    "style": `
      #TC {
        width: 728px;
        height: 90px;
      }
    `
  },
  "jp__co__impress__watch__pc": {
    "url": "http://pc.watch.impress.co.jp/docs/news/yajiuma/20160413_753024.html",
    "width": 850,
    "height": 1600,
    "target": "div.image-wrap",
    "desc": "div.image-wrap + p",
    "remove": {
      "div.hdg-article h2": true,
    },
    "replace": {
      "div.hdg-article h1": _.template('<%= title %>'),
      "p.pgh-articleinfo-01": _.template('<%= start_moment.format("（YYYY/M/D HH:mm）") %>'),
      "div.sub div.box-nav .pubdate": _.template('[<%= recent_moment.format("YYYY/MM/DD") %>]'),
    },
    "style": `
      div.image-wrap {
        margin-bottom: 50px;
      }

      body.lyt-smx .page .extra {
        display: none;
      }

      .lyt-smx div.main {
        min-width: 640px;
      }
    `
  }
  // "jp__co__yahoo__headlines": {
  //   "url": "http://headlines.yahoo.co.jp/hl?a=20160413-00010006-afpbbnewsv-int",
  //   "width": 960,
  //   "height": 1600,
  // },
};

export default siteLi;