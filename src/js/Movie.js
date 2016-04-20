import jpeg from 'jpeg-js';

export default class Movie {
  constructor() {
    this.$stage = $('main > .media > .face');
    this.canvas = this.$stage.find('.movie canvas').get(0);
    this.ctx = this.canvas.getContext('2d');

    this.canvasEarth = $('.wrapper > .three canvas').get(0);
    this.ctxEarth = this.canvasEarth.getContext('2d');
  }

  render() {
    var width = this.canvasEarth.width;
    var height = this.canvasEarth.height;
    this.canvas.width = width;
    this.canvas.height = height;

    var imgData = this.ctx.createImageData(width, height);
    var data = imgData.data;

    var rawImageData = this.ctxEarth.getImageData(0, 0, width, height);

    var jpegImageData = jpeg.decode(jpeg.encode(rawImageData, 20).data);

    // copy img byte-per-byte into our ImageData
    for (var i = 0, len = width * height * 4; i < len; i++) {
        data[i] = jpegImageData.data[i];
    }

    this.ctx.putImageData(imgData, 0, 0);
  }
}