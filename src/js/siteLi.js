const kanjiName = '岩淵勇樹';

const siteLi = {
  // 動画サイト
  "com__youtube": {
    "url": "https://www.youtube.com/watch?v=_-1BeTJAbns",
    "width": 960,
    "height": 1600,
    "target": "#player-api",
    "title": "#eow-title",
    "replace": {
      ".yt-thumb-clip": `<img src="//placehold.it/48x48" width="48" height="48"><span class="vertical-align"></span>`,
      "#watch-header .yt-user-info a": `${kanjiName}`,
    }
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
    "title": ".no-js .detail .detail-no-js .module--header .contentTitle",
    "desc": "#news_textbody",
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
    "title": "#Main #MainInner .ArticleTitle .Title h1",
    "desc": "#Main #MainInner .ArticleText p:first-child",
    "replace": {
      "#Main #MainInner .ArticleBody .AdMod": `<img src="//placehold.it/300x300">`,
      "#Sub #SubInner .Section .Ad": `<img src="//placehold.it/300x250">`,
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
    "title": '#article .cntimage .title',
    "desc": '#article .cntimage .preface br:nth-of-type(3)',
    "desc_position": "after",
    "remove": {
      '#article .cntimage .yeartime': true,
      '#article .cntimage .preface small:first-child': true,
    },
    "replace": {
      "#TC": `<img src="//placehold.it/728x90">`,
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
    "title": "div.hdg-article h1",
    "desc": "div.image-wrap + p",
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