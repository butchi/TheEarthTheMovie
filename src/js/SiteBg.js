import siteLi from './siteLi';
var cnt = 0;

export default class SiteBg {
  constructor() {
    this.keys = Object.keys(siteLi);
  }

  pushBg(idx = cnt) {
    cnt = (cnt + 1) % this.keys.length;
    var name = this.keys[idx];

    var site = siteLi[name];
    var rootPath = (site.url.match(/^([httpsfile]+:\/{2,3}[0-9a-z\.\-:]+?:?[0-9]*?\/)/i) || [])[1];
    var parentPath = (site.url.match(/^(.+\/)/i) || [])[1];
    var $iframe = $(`<iframe width="${site.width}" height="${site.height}"></iframe>`);

    $iframe.addClass(name);
    try {
      $iframe.attr('src', `template/${name}.html`);
    } catch(e) {
      console.log(e);
    }
    $('.bg-site').prepend($iframe);
    $iframe.css({
      "z-index": -1,
    });
    $iframe.on('load', (evt) => {
      var $contents = $(evt.target).contents();

      // スクロールバーを隠す
      $contents.find('body').css({
        overflow: 'hidden',
      });

      $(evt.target.document).ready(() => {
        ['src', 'href'].forEach((ref) => {
          $contents.find('[srcset]').attr('srcset', ''); // できれば対応
          $contents.find(`[${ref}]`).each((i, elm) => {
            var $elm = $(elm);
            var path = $elm.attr(ref);

            // httpとhttps
            if(path.match(/^http.*:/i)) {
              return;
            }

            // '//'で始まるパス（プロトコル省略）
            if(path.match(/^\/\//i)) {
              return;
            }

            // '/'で始まるパス（サイトルート相対パス）
            if(path.match(/^\//i)) {
              $elm.attr(ref, path.replace(/^\//, rootPath));
              return;
            }

            // 相対パス（'.'で始まる相対パス含む）
            $elm.attr(ref, parentPath + path);
          });
        });

        if(site.title) {
          $contents.find(site.title).text('セロ弾きのゴーシュ');
        }

        if(site.desc) {
          let txt = `　ゴーシュは町の活動写真館でセロを弾く係りでした。けれどもあんまり上手でないという評判でした。上手でないどころではなく実は仲間の楽手のなかではいちばん下手でしたから、いつでも楽長にいじめられるのでした。
　ひるすぎみんなは楽屋に円くならんで今度の町の音楽会へ出す第六交響曲こうきょうきょくの練習をしていました。
　トランペットは一生けん命歌っています。
　ヴァイオリンも二いろ風のように鳴っています。
　クラリネットもボーボーとそれに手伝っています。
　ゴーシュも口をりんと結んで眼めを皿さらのようにして楽譜がくふを見つめながらもう一心に弾いています。
　にわかにぱたっと楽長が両手を鳴らしました。みんなぴたりと曲をやめてしんとしました。楽長がどなりました。
「セロがおくれた。トォテテ　テテテイ、ここからやり直し。はいっ。」
　みんなは今の所の少し前の所からやり直しました。ゴーシュは顔をまっ赤にして額に汗あせを出しながらやっといま云いわれたところを通りました。ほっと安心しながら、つづけて弾いていますと楽長がまた手をぱっと拍うちました。
「セロっ。糸が合わない。困るなあ。ぼくはきみにドレミファを教えてまでいるひまはないんだがなあ。」
　みんなは気の毒そうにしてわざとじぶんの譜をのぞき込こんだりじぶんの楽器をはじいて見たりしています。ゴーシュはあわてて糸を直しました。これはじつはゴーシュも悪いのですがセロもずいぶん悪いのでした。
`.replace(/\n/g, '<br>');
          if(!site.desc_position) {
            $contents.find(site.desc).html(txt);
          }
          if(site.desc_position === 'before') {
            $contents.find(site.desc).before(txt);
          }
          if(site.desc_position === 'after') {
            $contents.find(site.desc).after(txt);
          }
        }

        if(site.remove) {
          Object.keys(site.remove).forEach((selector) => {
            if(site.remove[selector]) {
              $contents.find(selector).remove();
            }
          });
        }

        if(site.replace) {
          Object.keys(site.replace).forEach((selector) => {
            $contents.find(selector).html(site.replace[selector]);
          });
        }

        if(site.style) {
          $contents.find('body').append(`<style>${site.style}</style>`);
        }

        setTimeout(setPosition, 0);
        setTimeout(setPosition, 2000);
        setTimeout(setPosition, 5000);

        function setPosition() {
          if(site.target) {
            // TODO: 定期的に位置調整
            let $target = $contents.find(site.target).eq(0);
            let offset = $target.offset();

            $target.text();

            $target.css({
              width: 640,
              'min-width': 640, 
              'max-width': 640, 
              height: 380,
              'min-height': 380, 
              'max-height': 380, 
              border: 'none',
            });

            $iframe.css({
              position: 'absolute',
              left: '50%',
              top: '50%',
              'margin-left': - offset.left - 320,
              'margin-top': - offset.top - 190,
            });
          }
        }
      });
    });
  }

  popBg() {
    var $last = $('.bg-site').find('iframe:last-child');
    var $last2 = $('.bg-site').find('iframe:nth-last-child(2)')

    $last.remove();
    $last2.css({
      "z-index": 0,
    });

    $last = null;
  }
}

    Object.keys(siteLi).forEach((name, i) => {
    });
