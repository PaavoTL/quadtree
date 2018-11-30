/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/main.js":
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _quadtree__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./quadtree */ \"./src/quadtree.js\");\n\r\n\r\n\r\n\r\nclass Engine {\r\n    constructor(){\r\n        document.body.style.margin = \"0px\";\r\n        document.body.style.overflow = \"hidden\";\r\n\r\n        this.canvas = document.createElement(\"canvas\");\r\n\r\n        this.canvas.width = window.innerWidth;\r\n        this.canvas.height = window.innerHeight;\r\n\r\n        document.body.appendChild(this.canvas);\r\n        this.ctx = this.canvas.getContext(\"2d\");\r\n\r\n        this.ctx.fillStyle = \"#303030\";\r\n        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);\r\n\r\n    }\r\n}\r\n\r\nlet engine = new Engine();\r\n\r\nlet boundary = new _quadtree__WEBPACK_IMPORTED_MODULE_0__[\"Rectangle\"]();\r\nlet qt = new _quadtree__WEBPACK_IMPORTED_MODULE_0__[\"QuadTree\"](boundary, 4);\r\n\r\nfor(let i = 0; i < 40; i++){\r\n    let p = new _quadtree__WEBPACK_IMPORTED_MODULE_0__[\"Point\"](Math.random(undefined.canvas.width),Math.random(undefined.canvas.height))\r\n    qt.insert(p)\r\n}\r\n\r\nconsole.log(qt);\r\n\r\n\n\n//# sourceURL=webpack:///./src/main.js?");

/***/ }),

/***/ "./src/quadtree.js":
/*!*************************!*\
  !*** ./src/quadtree.js ***!
  \*************************/
/*! exports provided: Point, Rectangle, QuadTree */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Point\", function() { return Point; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Rectangle\", function() { return Rectangle; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"QuadTree\", function() { return QuadTree; });\nclass Point {\r\n    constructor(x,y){\r\n        this.x = x;\r\n        this.y = y;\r\n    }\r\n}\r\n\r\nclass Rectangle {\r\n    constructor(x,y,w,h){\r\n        this.x = x;\r\n        this.y = y;\r\n        this.w = w;\r\n        this.h = h;\r\n    }\r\n\r\n    contains(point){\r\n        return (point.x > this.x - this.w &&\r\n            point.x < this.x + this.w &&\r\n            point.y > this.y - this.h &&\r\n            point.y < this.y + this.h);\r\n    }\r\n}\r\n\r\nclass QuadTree {\r\n    constructor(boundary,n) {\r\n        this.boundary = boundary;\r\n        this.capacity = n;\r\n        this.points = [];\r\n        this.divided = false;\r\n    }\r\n\r\n    subdivide(){\r\n        let x = this.boundary.x;\r\n        let y = this.boundary.y;\r\n        let w = this.boundary.w;\r\n        let h = this.boundary.h;\r\n\r\n        let nw = new Rectangle(x,y,w/2,h/2);\r\n        this.northWest = new QuadTree(nw, this.capacity);\r\n        let ne = new Rectangle(x+w/2,y,w/2,h/2);\r\n        this.northEast = new QuadTree(ne, this.capacity);\r\n        let sw = new Rectangle(x,y+h/2,w/2,h/2);\r\n        this.southWest = new QuadTree(sw, this.capacity);\r\n        let se = new Rectangle(x+w/2,y+h/2,w/2,h/2);\r\n        this.southEast = new QuadTree(se, this.capacity);\r\n        \r\n        this.divided = true;\r\n    }\r\n\r\n    insert(point) {\r\n        if (!this.boundary.contains(point)){\r\n            return;\r\n        }\r\n\r\n        if (this.points.length < this.capacity) {\r\n            this.points.push(point);\r\n\r\n        } else if (!this.divided) {\r\n            this.subdivide();\r\n        }\r\n\r\n        this.northWest.insert(point);\r\n        this.northEast.insert(point);\r\n        this.southWest.insert(point);\r\n        this.southEast.insert(point);\r\n    }\r\n}\n\n//# sourceURL=webpack:///./src/quadtree.js?");

/***/ })

/******/ });