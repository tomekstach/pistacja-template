/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"./ex": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
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
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push(["./src/joomla/html/com_videos/item/default/player/modules/exercises/ex.js","vendor"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/joomla/html/com_videos/item/default/player/modules/exercises/ex.js":
/*!********************************************************************************!*\
  !*** ./src/joomla/html/com_videos/item/default/player/modules/exercises/ex.js ***!
  \********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Exercises; });
/* harmony import */ var travrs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! travrs */ "./node_modules/travrs/dist/index.js");
/* harmony import */ var travrs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(travrs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var anchor_catch__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! anchor-catch */ "./src/modules/anchor-catch/index.js");
/* harmony import */ var _styles_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./styles.scss */ "./src/joomla/html/com_videos/item/default/player/modules/exercises/styles.scss");
/* harmony import */ var _styles_scss__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_styles_scss__WEBPACK_IMPORTED_MODULE_2__);
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }




function Exercises(root) {
  if (!root) throw new Error("Pistacja Exercises: No root node provided.");
  var anchor = Object(anchor_catch__WEBPACK_IMPORTED_MODULE_1__["default"])(root);
  var h5pUrl = "https://h5p.pistacja.tv/wp-admin/admin-ajax.php?action=h5p_embed&id=";
  anchor["catch"]("exercise", function (_ref, element) {
    var yid = _ref.yid;

    var _template = Object(travrs__WEBPACK_IMPORTED_MODULE_0__["template"])("\n      div.pie-exercises-modal\n        h2 > \"".concat(decodeURIComponent(element.title), "\"\n          @close::button.close-button > \"close\"\n        @player::iframe[width=\"100%\" height=\"100%\" scrolling=\"yes\" frameborder=\"0\" allowfullscreen]\n    ")),
        _template2 = _slicedToArray(_template, 2),
        popup = _template2[0],
        refs = _template2[1];

    refs.player.src = h5pUrl + yid;
    refs.close.addEventListener("click", function () {
      popup.style.display = "none";
    });
    document.body.appendChild(popup);
  });
}

/***/ }),

/***/ "./src/joomla/html/com_videos/item/default/player/modules/exercises/styles.scss":
/*!**************************************************************************************!*\
  !*** ./src/joomla/html/com_videos/item/default/player/modules/exercises/styles.scss ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./src/modules/anchor-catch/index.js":
/*!*******************************************!*\
  !*** ./src/modules/anchor-catch/index.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return anchorCatch; });
/* harmony import */ var utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! utils */ "./src/modules/utils/index.js");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

// Helpers.
 // Allows to use <a/> tags as active-buttons with parameters in "href" attribute.
//
// USAGE:
//
// <a href="#subject?option1=A&option2=B">MyLink</a>
//
// const ac = anchorCatch("selector");
//
// ac.catch("subject", (options, element) => {
//   console.log(options); // {option1: "A", option2: "B"}
// });
//

function anchorCatch(selector) {
  var root = selector instanceof HTMLElement ? selector : document.querySelector(selector);
  var handlers = {};

  function intercept(event) {
    if (!isValidAnchor(event.target)) return;

    var _extractSubjectAndOpt = extractSubjectAndOptions(event.target.href),
        _extractSubjectAndOpt2 = _slicedToArray(_extractSubjectAndOpt, 2),
        subject = _extractSubjectAndOpt2[0],
        options = _extractSubjectAndOpt2[1];

    handlers[subject] && handlers[subject](options, event.target);
    event.preventDefault();
  }

  root && root.addEventListener("click", intercept);
  return {
    "catch": function _catch(subject, callback) {
      if (typeof subject === "string", typeof callback === "function") {
        handlers[subject] = callback;
      }
    },
    destroy: function destroy() {
      root && root.removeEventListener("click", intercept);
      Object.keys(handlers).forEach(function (key) {
        return delete handlers[key];
      });
    }
  };
}
; // ---- Helpers ----------------

function isValidAnchor(element) {
  return element.nodeName === "A" && element.href && element.href.includes("#");
}

function extractSubjectAndOptions(href) {
  var index = href.indexOf("#");
  var params = href.slice(index + 1).split("?");
  var options = params[1] ? Object(utils__WEBPACK_IMPORTED_MODULE_0__["queryToObject"])("?".concat(params[1])) : undefined;
  return [params[0], options];
}

/***/ }),

/***/ "./src/modules/utils/index.js":
/*!************************************!*\
  !*** ./src/modules/utils/index.js ***!
  \************************************/
/*! exports provided: debounce, queryToObject, uid, memo, isPrevious, timeToSeconds */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "debounce", function() { return debounce; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "queryToObject", function() { return queryToObject; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "uid", function() { return uid; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "memo", function() { return memo; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isPrevious", function() { return isPrevious; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "timeToSeconds", function() { return timeToSeconds; });
// Debounce (delay) callback fn.
function debounce(callback, delay, immediate) {
  var timeout;
  return function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var later = function later() {
      timeout = null;
      !immediate && callback.apply(void 0, args);
    };

    clearTimeout(timeout);
    timeout = setTimeout(later, delay);
    immediate && !timeout && callback.apply(void 0, args);
  };
}
; // Extract search query from URL and parse it into JS object.
// Returns: {} OR {key:value, ...};

function queryToObject(url) {
  var index = url.indexOf("?");
  var query = ~index ? url.slice(index + 1, url.length) : "";
  return !query.length ? {} : query.split("&").reduce(function (acc, param) {
    var touple = param.split("=");
    acc[touple[0]] = touple[1];
    return acc;
  }, {});
}
; // Geerate unique id.

var uid = function uid() {
  return "PIE." + (+new Date() + Math.random() * 100).toString(32);
}; // Modifier function with memory.

var memo = function memo(modifier, previous) {
  if (typeof modifier !== 'function') throw "Modifier need to be a function.";
  return function (current) {
    //NOTE: To memoize previous value you need to return it from the 'modifier'.
    previous = modifier(current, previous);
    return previous;
  };
}; // Memoize prev. value.

function isPrevious(state) {
  return function (newState) {
    if (state !== newState) {
      state = newState;
      return false;
    }

    return true;
  };
} // Translate clock time notation into seconds.

function timeToSeconds(time) {
  var parts = time.split(":");
  return parseInt(parts[0]) * 60 * 60 + parseInt(parts[1]) * 60 + parseInt(parts[2]);
}

/***/ })

/******/ });