var container, stats;
var camera, scene, renderer;
var group;
var mouseX = 0, mouseY = 0;

var WIDTH = 640;
var HEIGHT = 350;

export default class Earth {
  constructor() {
  }

  init() {

    const $stage = $('main > .face');

    container = $stage.find('.three').get(0);

    camera = new THREE.PerspectiveCamera( 60, WIDTH / HEIGHT, 1, 2000 );
    camera.position.z = 500;

    scene = new THREE.Scene();

    group = new THREE.Group();
    scene.add( group );

    // earth

    var loader = new THREE.TextureLoader();
    loader.load( 'img/land_ocean_ice_cloud_2048.jpg', function ( texture ) {

      var geometry = new THREE.SphereGeometry( 200, 20, 20 );

      var material = new THREE.MeshBasicMaterial( { map: texture, overdraw: 0.5 } );
      var mesh = new THREE.Mesh( geometry, material );
      group.add( mesh );

    } );

    renderer = new THREE.CanvasRenderer();
    renderer.setClearColor( 0x000000 );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( WIDTH, HEIGHT );
    container.appendChild( renderer.domElement );

    stats = new Stats();
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.top = '0px';
    container.appendChild( stats.domElement );

  }

  animate() {

    requestAnimationFrame( () => {
      this.animate();
    } );

    this.render();
    stats.update();

  }

  render() {

    camera.position.x += ( mouseX - camera.position.x ) * 0.05;
    camera.position.y += ( - mouseY - camera.position.y ) * 0.05;
    camera.lookAt( scene.position );

    group.rotation.y -= 0.0001;

    renderer.render( scene, camera );

  }
}
