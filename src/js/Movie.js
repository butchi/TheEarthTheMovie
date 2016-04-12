import jpeg from 'jpeg-js';

var WIDTH = 640;
var HEIGHT = 350;

export default class Movie {
  constructor() {
  }

  render() {
    var canvas = $('.movie canvas').get(0);
    canvas.width = WIDTH;
    canvas.height = HEIGHT;
    var ctx = canvas.getContext('2d');

    var canvasEarth = document.querySelector('#container canvas');

    var ctxEarth = canvasEarth.getContext('2d');

    var imgData = ctx.createImageData(WIDTH, HEIGHT);
    var data = imgData.data;

    var rawImageData = ctxEarth.getImageData(0, 0, WIDTH, HEIGHT);

    var jpegImageData = jpeg.decode(jpeg.encode(rawImageData, 20).data);

    // copy img byte-per-byte into our ImageData
    for (var i = 0, len = WIDTH * HEIGHT * 4; i < len; i++) {
        data[i] = jpegImageData.data[i];
    }

    ctx.putImageData(imgData, 0, 0);
  }
}