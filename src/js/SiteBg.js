import moment from 'moment';

import siteLi from './siteLi';

var cnt = 0;
var $browserFrame;
var $media;

export default class SiteBg {
  constructor(opts) {
    this.keys = Object.keys(siteLi);

    this.news = opts.news;

    $browserFrame = $('.browser-frame');
    $media = $('.media');

    this.$frameOpen = $('.frame-open');
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
      "visibility": 'hidden',
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

        if(site.desc) {
          let txt = this.news.desc.replace(/\n/g, '<br>');
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
            var tmpl = site.replace[selector];
            if(typeof tmpl === 'function') {
              $contents.find(selector).html(tmpl({
                "title": this.news.title,
                "start_moment": moment(window.licker.main.startDate),
                "recent_moment": moment(window.licker.main.recentDate),
              }));
            } else {
              let after = site.replace[selector];
              $contents.find(selector).html(after);
            }
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
    var $last2 = $('.bg-site').find('iframe:nth-last-child(2)');

    $last.remove();
    $last2.css({
      "visibility": 'visible',
    });

    $media.css({
      "visibility": 'visible',
    });

    this.$frameOpen.on('transitionend', () => {
      this.$frameOpen.removeClass('open');
    });

    this.$frameOpen.addClass('open');

    this.$frameOpen.css({
      width: $last2.width(),
      height: $last2.width(),
      left: $last2.offset().left,
      top: $last2.offset().top,
    });

    $browserFrame.css({
      width: $last2.width(),
      left: $last2.offset().left,
      top: $last2.offset().top,
    });

    $last = null;
  }
}
