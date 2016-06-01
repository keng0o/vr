(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var App = function () {
  function App(args) {
    _classCallCheck(this, App);

    // code
    var scene, camera, controls, effect, cube, manager, materials, parameters;
  }

  _createClass(App, [{
    key: 'init',
    value: function init() {
      this.scene = new THREE.Scene();
      this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      var renderer = new THREE.WebGLRenderer();
      renderer.setSize(window.innerWidth, window.innerHeight);
      document.body.appendChild(renderer.domElement);

      this.controls = new THREE.VRControls(this.camera);
      this.controls.standing = true;

      this.effect = new THREE.VREffect(renderer);
      this.effect.setSize(window.innerWidth, window.innerHeight);

      this.manager = new WebVRManager(renderer, this.effect);

      window.addEventListener('resize', this.onResize, true);
      window.addEventListener('vrdisplaypresentchange', this.onResize, true);

      var geometry = new THREE.BoxGeometry(1, 1, 1);
      var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
      this.cube = new THREE.Mesh(geometry, material);
      this.cube.position.set(0, 0, -5);
      this.scene.add(this.cube);

      geometry = new THREE.Geometry();
      for (var i = 0; i < 20000; i++) {
        var vertex = new THREE.Vector3();
        vertex.x = Math.random() * 2000 - 1000;
        vertex.y = Math.random() * 2000 - 1000;
        vertex.z = Math.random() * 2000 - 1000;
        geometry.vertices.push(vertex);
      }
      this.parameters = [[[1, 1, 0.5], 5], [[0.95, 1, 0.5], 4], [[0.90, 1, 0.5], 3], [[0.85, 1, 0.5], 2], [[0.80, 1, 0.5], 1]];
      var materials = [];
      for (var i = 0; i < this.parameters.length; i++) {
        var size = this.parameters[i][1];
        materials[i] = new THREE.PointsMaterial({ size: size });
        var particles = new THREE.Points(geometry, materials[i]);
        particles.rotation.x = Math.random() * 6;
        particles.rotation.y = Math.random() * 6;
        particles.rotation.z = Math.random() * 6;
        this.scene.add(particles);
      }
      this.materials = materials;

      this.render();
    }
  }, {
    key: 'onResize',
    value: function onResize(e) {
      this.effect.setSize(window.innerWidth, window.innerHeight);
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
    }
  }, {
    key: 'render',
    value: function render() {
      var _this = this;

      var time = Date.now() * 0.00005;

      this.cube.rotation.x += 0.1;
      this.cube.rotation.y += 0.1;
      requestAnimationFrame(function () {
        return _this.render();
      });
      this.controls.update();

      for (var i = 0; i < this.scene.children.length; i++) {
        var object = this.scene.children[i];
        if (object instanceof THREE.Points) {
          object.rotation.y = time * (i < 4 ? i + 1 : -(i + 1));
        }
      }
      for (var i = 0; i < this.materials.length; i++) {
        var color = this.parameters[i][0];
        var h = 360 * (color[0] + time) % 360 / 360;
        this.materials[i].color.setHSL(h, color[1], color[2]);
      }

      this.manager.render(this.scene, this.camera);
    }
  }]);

  return App;
}();

var user = new App();
user.init();

// class App  {
//   constructor(args) {
//     // code
//     var container, stats;
//     var camera, controls, effect, manager, scene, renderer, particles, geometry, materials = [], parameters, color, size;
//     var mouseX = 0, mouseY = 0;
//     var windowHalfX = window.innerWidth / 2;
//     var windowHalfY = window.innerHeight / 2;
//     this.init();
//     this.animate();
//   }
//   init() {
//     this.scene = new THREE.Scene();
//     this.scene.fog = new THREE.FogExp2( 0x000000, 0.0007 );
//     this.camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
//     this.camera.position.z = 1000;

//     var renderer = new THREE.WebGLRenderer();
//     renderer.setSize(window.innerWidth, window.innerHeight);
//     document.body.appendChild(renderer.domElement);

//     this.geometry = new THREE.Geometry();

//     this.controls = new THREE.VRControls(this.camera);
//     this.controls.standing = true;

//     this.effect = new THREE.VREffect(renderer);
//     this.effect.setSize(window.innerWidth, window.innerHeight);

//     this.manager = new WebVRManager(renderer, this.effect);

//     window.addEventListener('resize', this.onResize, true);
//     window.addEventListener('vrdisplaypresentchange', this.onResize, true);

//     for (var i = 0; i < 20000; i ++ ) {
//       var vertex = new THREE.Vector3();
//       vertex.x = Math.random() * 2000 - 1000;
//       vertex.y = Math.random() * 2000 - 1000;
//       vertex.z = Math.random() * 2000 - 1000;
//       this.geometry.vertices.push( vertex );
//     }
//     this.parameters = [
//       [ [1, 1, 0.5], 5 ],
//       [ [0.95, 1, 0.5], 4 ],
//       [ [0.90, 1, 0.5], 3 ],
//       [ [0.85, 1, 0.5], 2 ],
//       [ [0.80, 1, 0.5], 1 ]
//     ];
//     var materials = [];
//     for (var i = 0; i < this.parameters.length; i ++ ) {
//       this.color = this.parameters[i][0];
//       var size  = this.parameters[i][1];
//       materials[i] = new THREE.PointsMaterial( { size: size } );
//       this.particles = new THREE.Points( this.geometry, materials[i] );
//       this.particles.rotation.x = Math.random() * 6;
//       this.particles.rotation.y = Math.random() * 6;
//       this.particles.rotation.z = Math.random() * 6;
//       this.scene.add( this.particles );
//     }
//     this.materials = materials;
//     // this.renderer = new THREE.WebGLRenderer();
//     // this.renderer.setPixelRatio( window.devicePixelRatio );
//     // this.renderer.setSize( window.innerWidth, window.innerHeight );
//     // this.container.appendChild( this.renderer.domElement );
//     this.stats = new Stats();
//     // this.container.appendChild( this.stats.dom );
//     document.addEventListener( 'mousemove', this.onDocumentMouseMove, false );
//     document.addEventListener( 'touchstart', this.onDocumentTouchStart, false );
//     document.addEventListener( 'touchmove', this.onDocumentTouchMove, false );

//     window.addEventListener( 'resize', this.onWindowResize, false );
//   }
//   onWindowResize() {
//     this.windowHalfX = window.innerWidth / 2;
//     this.windowHalfY = window.innerHeight / 2;
//     this.camera.aspect = window.innerWidth / window.innerHeight;
//     this.camera.updateProjectionMatrix();
//     this.renderer.setSize( window.innerWidth, window.innerHeight );
//   }
//   onDocumentMouseMove( event ) {
//     this.mouseX = event.clientX - this.windowHalfX;
//     this.mouseY = event.clientY - this.windowHalfY;
//   }
//   onDocumentTouchStart( event ) {
//     if ( event.touches.length === 1 ) {
//       event.preventDefault();
//       this.mouseX = event.touches[ 0 ].pageX - this.windowHalfX;
//       this.mouseY = event.touches[ 0 ].pageY - this.windowHalfY;
//     }
//   }
//   onDocumentTouchMove( event ) {
//     if ( event.touches.length === 1 ) {
//       event.preventDefault();
//       this.mouseX = event.touches[ 0 ].pageX - this.windowHalfX;
//       this.mouseY = event.touches[ 0 ].pageY - this.windowHalfY;
//     }
//   }
//   //
//   animate() {
//     // requestAnimationFrame( ()=>{this.animate()} );
//     // this.render();
//     // stats.update();
//   }
//   onResize(e) {
//     this.effect.setSize(window.innerWidth, window.innerHeight);
//     this.camera.aspect = window.innerWidth / window.innerHeight;
//     this.camera.updateProjectionMatrix();
//   }
//   render() {
//     var time = Date.now() * 0.00005;
//     this.camera.position.x += ( this.mouseX - this.camera.position.x ) * 0.05;
//     this.camera.position.y += ( - this.mouseY - this.camera.position.y ) * 0.05;
//     this.camera.lookAt( this.scene.position );
//     for (var i = 0; i < this.scene.children.length; i ++ ) {
//       var object = this.scene.children[ i ];
//       if ( object instanceof THREE.Points ) {
//         object.rotation.y = time * ( i < 4 ? i + 1 : - ( i + 1 ) );
//       }
//     }
//     for (var i = 0; i < this.materials.length; i ++ ) {
//       this.color = this.parameters[i][0];
//       var h = ( 360 * ( this.color[0] + time ) % 360 ) / 360;
//       this.materials[i].color.setHSL( h, this.color[1], this.color[2] );
//     }
//     requestAnimationFrame(() => this.render());
//     this.controls.update();
//     this.manager.render(this.scene, this.camera);
//   }
//   // methods
// }
// var app = new App();
// app.init();
},{}]},{},[1]);
