parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"g5IB":[function(require,module,exports) {

var t,e,n=module.exports={};function r(){throw new Error("setTimeout has not been defined")}function o(){throw new Error("clearTimeout has not been defined")}function i(e){if(t===setTimeout)return setTimeout(e,0);if((t===r||!t)&&setTimeout)return t=setTimeout,setTimeout(e,0);try{return t(e,0)}catch(n){try{return t.call(null,e,0)}catch(n){return t.call(this,e,0)}}}function u(t){if(e===clearTimeout)return clearTimeout(t);if((e===o||!e)&&clearTimeout)return e=clearTimeout,clearTimeout(t);try{return e(t)}catch(n){try{return e.call(null,t)}catch(n){return e.call(this,t)}}}!function(){try{t="function"==typeof setTimeout?setTimeout:r}catch(n){t=r}try{e="function"==typeof clearTimeout?clearTimeout:o}catch(n){e=o}}();var c,s=[],l=!1,a=-1;function f(){l&&c&&(l=!1,c.length?s=c.concat(s):a=-1,s.length&&h())}function h(){if(!l){var t=i(f);l=!0;for(var e=s.length;e;){for(c=s,s=[];++a<e;)c&&c[a].run();a=-1,e=s.length}c=null,l=!1,u(t)}}function m(t,e){this.fun=t,this.array=e}function p(){}n.nextTick=function(t){var e=new Array(arguments.length-1);if(arguments.length>1)for(var n=1;n<arguments.length;n++)e[n-1]=arguments[n];s.push(new m(t,e)),1!==s.length||l||i(h)},m.prototype.run=function(){this.fun.apply(null,this.array)},n.title="browser",n.env={},n.argv=[],n.version="",n.versions={},n.on=p,n.addListener=p,n.once=p,n.off=p,n.removeListener=p,n.removeAllListeners=p,n.emit=p,n.prependListener=p,n.prependOnceListener=p,n.listeners=function(t){return[]},n.binding=function(t){throw new Error("process.binding is not supported")},n.cwd=function(){return"/"},n.chdir=function(t){throw new Error("process.chdir is not supported")},n.umask=function(){return 0};
},{}],"vWcT":[function(require,module,exports) {
var define;
var process = require("process");
var global = arguments[3];
},{"process":"g5IB"}],"p3SI":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.UI_COLOR=exports.TILE_W=exports.TILE_H=exports.SCREEN=exports.FRAME_CONFIG=exports.FONT_SIZE=void 0;var e=32;exports.TILE_W=e;var r=32;exports.TILE_H=r;var t={width:15*e,height:15*r};exports.SCREEN=t;var o={frameWidth:e,frameHeight:r};exports.FRAME_CONFIG=o;var x={normal:"18px",big:"27px",large:"36px"};exports.FONT_SIZE=x;var p={normalText:"#F1F1F1",inactiveMenuItem:"#3CA370",activeMenuItem:"#CFFF70",textShadow:"#1E1E1E",background:"#43434F"};exports.UI_COLOR=p;
},{}],"N93S":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.IntroScene=void 0;var e=require("./constants");function t(e){return(t="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function o(e,t,n){return t&&r(e.prototype,t),n&&r(e,n),Object.defineProperty(e,"prototype",{writable:!1}),e}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&c(e,t)}function c(e,t){return(c=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function u(e){var t=a();return function(){var n,r=l(e);if(t){var o=l(this).constructor;n=Reflect.construct(r,arguments,o)}else n=r.apply(this,arguments);return s(this,n)}}function s(e,n){if(n&&("object"===t(n)||"function"==typeof n))return n;if(void 0!==n)throw new TypeError("Derived constructors may only return object or undefined");return f(e)}function f(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function a(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){})),!0}catch(e){return!1}}function l(e){return(l=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function y(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var p=function(t){i(c,Phaser.Scene);var r=u(c);function c(){var e;return n(this,c),y(f(e=r.call(this,"IntroScene")),"pressAnyKeyText",null),y(f(e),"blinkTimer",0),y(f(e),"isBlinked",!1),e}return o(c,[{key:"preload",value:function(){this.load.image("intro","assets/intro.png")}},{key:"create",value:function(){var t=this;this.add.sprite(240,344,"intro").setScale(3),this.add.text(142,50,"Бомбические\nподземелья",{fontSize:e.FONT_SIZE.big,fontFamily:"NewGen",align:"center",color:e.UI_COLOR.normalText}),this.pressAnyKeyText=this.add.text(140,200,"Нажми любую кнопку",{fontSize:e.FONT_SIZE.normal,fontFamily:"NewGen",color:e.UI_COLOR.activeMenuItem}).setShadow(2,3,e.UI_COLOR.textShadow,1,!0,!0),this.input.keyboard.on("keyup",function(){t.scene.start("MenuScene")})}},{key:"update",value:function(t,n){this.blinkTimer<600?this.blinkTimer+=n:(this.blinkTimer=0,this.isBlinked?(this.pressAnyKeyText.setColor(e.UI_COLOR.activeMenuItem),this.isBlinked=!1):(this.pressAnyKeyText.setColor(e.UI_COLOR.inactiveMenuItem),this.isBlinked=!0))}}]),c}();exports.IntroScene=p;
},{"./constants":"p3SI"}],"K0XE":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.GameScene=void 0;var e=require("./constants");function t(e){return(t="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){for(var r=0;r<t.length;r++){var a=t[r];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}function s(e,t,r){return t&&a(e.prototype,t),r&&a(e,r),Object.defineProperty(e,"prototype",{writable:!1}),e}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&o(e,t)}function o(e,t){return(o=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function n(e){var t=c();return function(){var r,a=h(e);if(t){var s=h(this).constructor;r=Reflect.construct(a,arguments,s)}else r=a.apply(this,arguments);return l(this,r)}}function l(e,r){if(r&&("object"===t(r)||"function"==typeof r))return r;if(void 0!==r)throw new TypeError("Derived constructors may only return object or undefined");return y(e)}function y(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function c(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){})),!0}catch(e){return!1}}function h(e){return(h=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function u(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}var p=function(t){i(o,Phaser.Scene);var a=n(o);function o(){var e;return r(this,o),u(y(e=a.call(this,"GameScene")),"fireKey",null),u(y(e),"cusrors",null),u(y(e),"player",null),u(y(e),"bombs",null),u(y(e),"blasts",[]),u(y(e),"playerSpeed",120),u(y(e),"isHMoves",!1),u(y(e),"isVMoves",!1),e}return s(o,[{key:"preload",value:function(){this.load.spritesheet("dude","assets/dude.png",e.FRAME_CONFIG),this.load.spritesheet("bomb","assets/bomb-frames.png",e.FRAME_CONFIG),this.load.spritesheet("blast","assets/blast-frames.png",e.FRAME_CONFIG)}},{key:"createAnimations",value:function(){this.anims.create({key:"idle",frames:[{key:"dude",frame:0}],frameRate:10,repeat:0}),this.anims.create({key:"run",frames:this.anims.generateFrameNumbers("dude",{start:0,end:7}),frameRate:12,repeat:-1}),this.anims.create({key:"bomb",frames:this.anims.generateFrameNumbers("bomb",{start:0,end:3}),frameRate:1.2,repeat:0}),this.anims.create({key:"blast-cross",frames:[{key:"blast",frame:0},{key:"blast",frame:3},{key:"blast",frame:6},{key:"blast",frame:3},{key:"blast",frame:0}],frameRate:6,repeat:0}),this.anims.create({key:"blast-body",frames:[{key:"blast",frame:1},{key:"blast",frame:4},{key:"blast",frame:7},{key:"blast",frame:4},{key:"blast",frame:1}],frameRate:6,repeat:0}),this.anims.create({key:"blast-tail",frames:[{key:"blast",frame:2},{key:"blast",frame:5},{key:"blast",frame:8},{key:"blast",frame:5},{key:"blast",frame:2}],frameRate:6,repeat:0})}},{key:"create",value:function(){this.player=this.physics.add.sprite(4*e.TILE_W,8*e.TILE_H,"dude"),this.player.setBounce(0),this.player.setCollideWorldBounds(!0),this.player.setDepth(1),this.player.availableBombCount=2,this.player.blastSize=2,this.bombs=this.physics.add.staticGroup(),this.physics.add.collider(this.player,this.bombs),this.cursors=this.input.keyboard.createCursorKeys(),this.fireKey=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE),this.createAnimations()}},{key:"spawnBomb",value:function(e,t){var r=this.bombs.create(t.x,t.y,"bomb");r.anims.play("bomb"),r.startTime=e}},{key:"drawBlast",value:function(t,r,a){var s=this,i=this.physics.add.sprite(t.x,t.y,"blast");i.startTime=a,i.anims.play("blast-cross"),this.physics.add.overlap(this.player,i,this.collidePlayerWithBlast),this.blasts.push(i);for(var o=[Phaser.Math.Vector2.LEFT,Phaser.Math.Vector2.RIGHT,Phaser.Math.Vector2.UP,Phaser.Math.Vector2.DOWN],n=function(i){o.forEach(function(o){var n=t.x+o.x*e.TILE_W*i,l=t.y+o.y*e.TILE_W*i,y=s.physics.add.sprite(n,l);o===Phaser.Math.Vector2.UP?y.setRotation(Phaser.Math.DegToRad(270)):o===Phaser.Math.Vector2.DOWN?y.setRotation(Phaser.Math.DegToRad(90)):i===r&&o===Phaser.Math.Vector2.LEFT&&y.setRotation(Phaser.Math.DegToRad(180)),y.anims.play(i===r?"blast-tail":"blast-body"),y.startTime=a,s.physics.add.overlap(s.player,y,s.collidePlayerWithBlast),s.bombs.children.entries.forEach(function(e){s.physics.add.overlap(e,y,s.explodeBomb,function(){return!0},s)}),s.blasts.push(y)})},l=1;l<=r;l++)n(l)}},{key:"collidePlayerWithBlast",value:function(){console.info("player is dead")}},{key:"explodeBomb",value:function(e,t){var r=t.startTime;this.drawBlast({x:e.x,y:e.y},this.player.blastSize,r),e.destroy(),this.player.availableBombCount+=1}},{key:"update",value:function(t,r){this.isVMoves||(this.cursors.left.isDown?(this.isHMoves=!0,this.player.anims.play("run",!0),this.player.body.rotation=270,this.player.setVelocityX(-this.playerSpeed)):this.cursors.right.isDown?(this.isHMoves=!0,this.player.anims.play("run",!0),this.player.body.rotation=90,this.player.setVelocityX(this.playerSpeed)):(this.isHMoves=!1,this.player.anims.play("idle"),this.player.setVelocityX(0))),this.isHMoves||(this.cursors.up.isDown?(this.player.anims.play("run",!0),this.player.body.rotation=0,this.isVMoves=!0,this.player.setVelocityY(-this.playerSpeed)):this.cursors.down.isDown?(this.player.anims.play("run",!0),this.player.body.rotation=180,this.isVMoves=!0,this.player.setVelocityY(this.playerSpeed)):(this.player.anims.play("idle"),this.isVMoves=!1,this.player.setVelocityY(0))),Phaser.Input.Keyboard.JustDown(this.fireKey)&&this.player.availableBombCount&&(this.player.availableBombCount-=1,this.spawnBomb(t,{x:Math.floor(this.player.x/e.TILE_W)*e.TILE_W+16,y:Math.floor(this.player.y/e.TILE_W)*e.TILE_W+16})),this.blasts.forEach(function(e){t-e.startTime>1e3&&e.destroy()});var a=this;this.bombs.children.entries.forEach(function(e){t-e.startTime>3e3&&a.explodeBomb(e,{startTime:t})})}}]),o}();exports.GameScene=p;
},{"./constants":"p3SI"}],"h6ET":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.MenuScene=void 0;var e=require("./constants");function t(e){return(t="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function o(e,t,n){return t&&r(e.prototype,t),n&&r(e,n),Object.defineProperty(e,"prototype",{writable:!1}),e}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&c(e,t)}function c(e,t){return(c=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function u(e){var t=f();return function(){var n,r=l(e);if(t){var o=l(this).constructor;n=Reflect.construct(r,arguments,o)}else n=r.apply(this,arguments);return a(this,n)}}function a(e,n){if(n&&("object"===t(n)||"function"==typeof n))return n;if(void 0!==n)throw new TypeError("Derived constructors may only return object or undefined");return s(e)}function s(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function f(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){})),!0}catch(e){return!1}}function l(e){return(l=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function y(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var p=function(t){i(c,Phaser.Scene);var r=u(c);function c(){var t;return n(this,c),y(s(t=r.call(this,"MenuScene")),"arrow",null),y(s(t),"currentItemIndex",0),y(s(t),"config",{startX:160,startY:200,lastY:null,incrementY:40,style:{fontSize:18,fontFamily:"NewGen",color:e.UI_COLOR.activeMenuItem}}),y(s(t),"menuItems",[{scene:"GameScene",text:"Новая игра"},{scene:"MenuOptionsScene",text:"Опции"}]),t}return o(c,[{key:"preload",value:function(){this.load.spritesheet("menu-arrow","assets/menu_assets/arrow.png",e.FRAME_CONFIG)}},{key:"createAnimations",value:function(){this.anims.create({key:"arrow",frames:this.anims.generateFrameNumbers("menu-arrow",{start:0,end:3}),frameRate:12,repeat:-1})}},{key:"create",value:function(){var t=this;this.arrow=this.physics.add.sprite(this.config.startX-40,this.config.startY,"menu-arrow"),this.menuItems.forEach(function(n,r){n.textObj=t.add.text(t.config.startX,r?t.config.lastY+t.config.incrementY:t.config.startY,n.text,t.config.style),n.textObj.setShadow(2,3,e.UI_COLOR.textShadow,1,!0,!0),t.config.lastY=n.textObj.y}),this.input.keyboard.on("keydown-ENTER",function(){t.scene.start(t.menuItems[t.currentItemIndex].scene)}),this.input.keyboard.on("keydown-UP",function(){0===t.currentItemIndex?t.currentItemIndex=t.menuItems.length-1:t.currentItemIndex--}),this.input.keyboard.on("keydown-DOWN",function(){t.currentItemIndex===t.menuItems.length-1?t.currentItemIndex=0:t.currentItemIndex++}),this.createAnimations()}},{key:"update",value:function(e,t){this.arrow.anims.play("arrow",!0),this.arrow.setY(this.menuItems[this.currentItemIndex].textObj.y+15)}}]),c}();exports.MenuScene=p;
},{"./constants":"p3SI"}],"Xwa1":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.MenuOptionsScene=void 0;var e=require("./constants");function t(e){return(t="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}function r(e,t,n){return t&&o(e.prototype,t),n&&o(e,n),Object.defineProperty(e,"prototype",{writable:!1}),e}function u(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&c(e,t)}function c(e,t){return(c=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function i(e){var t=l();return function(){var n,o=p(e);if(t){var r=p(this).constructor;n=Reflect.construct(o,arguments,r)}else n=o.apply(this,arguments);return f(this,n)}}function f(e,n){if(n&&("object"===t(n)||"function"==typeof n))return n;if(void 0!==n)throw new TypeError("Derived constructors may only return object or undefined");return a(e)}function a(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function l(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){})),!0}catch(e){return!1}}function p(e){return(p=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}var s=function(t){u(c,Phaser.Scene);var o=i(c);function c(){return n(this,c),o.call(this,"MenuOptionsScene")}return r(c,[{key:"preload",value:function(){}},{key:"create",value:function(){var t=this;this.add.text(90,200,"Опции в разработке",{fontSize:e.FONT_SIZE.big,fontFamily:"NewGen",color:e.UI_COLOR.activeMenuItem}).setShadow(2,3,e.UI_COLOR.textShadow,1,!0,!0),this.input.keyboard.on("keydown-ESC",function(){t.scene.start("MenuScene")})}},{key:"update",value:function(e,t){}}]),c}();exports.MenuOptionsScene=s;
},{"./constants":"p3SI"}],"H99C":[function(require,module,exports) {
"use strict";var e=c(require("phaser")),r=require("./constants"),n=require("./intro.scene"),u=require("./game.scene"),t=require("./menu.scene"),a=require("./menu-options.scene");function c(e){return e&&e.__esModule?e:{default:e}}var i={type:e.default.AUTO,width:r.SCREEN.width,height:r.SCREEN.height,scene:[n.IntroScene,t.MenuScene,a.MenuOptionsScene,u.GameScene],backgroundColor:r.UI_COLOR.background,physics:{default:"arcade",arcade:{debug:!1}},pixelArt:!0},s=new e.default.Game(i);
},{"phaser":"vWcT","./constants":"p3SI","./intro.scene":"N93S","./game.scene":"K0XE","./menu.scene":"h6ET","./menu-options.scene":"Xwa1"}]},{},["H99C"], null)
//# sourceMappingURL=src.e816d9bf.js.map