/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/joomla/html/com_videos/item/exam/exam.js":
/*!******************************************************!*\
  !*** ./src/joomla/html/com_videos/item/exam/exam.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var pistacja_plugin__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! pistacja/plugin */ "./src/modules/pistacja/plugin/index.js");
/* harmony import */ var data_copy__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! data-copy */ "./src/modules/data-copy/index.js");
/* harmony import */ var countdown__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! countdown */ "./src/modules/countdown/index.js");
/* harmony import */ var tabs_manager__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! tabs-manager */ "./src/modules/tabs-manager/index.js");




pistacja_plugin__WEBPACK_IMPORTED_MODULE_0__["default"].plugin(function Exam(_ref) {
  var remoteClassToggle = _ref.remoteClassToggle;
  (0,tabs_manager__WEBPACK_IMPORTED_MODULE_3__["default"])(940); // Dismiss Share menu.

  remoteClassToggle.listener(function (_ref2) {
    var targetName = _ref2.targetName,
        target = _ref2.target;

    if (targetName === "share") {
      var dismissMenu = function dismissMenu() {
        document.removeEventListener("click", dismissMenu);
        target.classList.remove("show");
      };

      document.addEventListener("click", dismissMenu);
    }
  }); // Coopy links to clipboard.

  (0,data_copy__WEBPACK_IMPORTED_MODULE_1__["default"])();
  var timer = document.getElementById("countdown-timer");
  timer && (0,countdown__WEBPACK_IMPORTED_MODULE_2__["default"])(timer.dataset.time, function (time) {
    timer.innerHTML = time.toString();
  });
});

/***/ }),

/***/ "./src/modules/countdown/index.js":
/*!****************************************!*\
  !*** ./src/modules/countdown/index.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ countdown)
/* harmony export */ });
// Countdown time to destinationDate.

/*
// USAGE:

  import countdown from "countdown";
  ...

  const display = document.getElementById("display");

  const cancelTimer = countdown("2022-01-18 20:00:00", time => {    
    console.log(time.days, time.hours, time.minutes, time.secons);
    display.innerHTML = time.toString();
  });

  // To cancel contdown; 
  cancelTimer();

*/
function countdown(destinationDate, update) {
  var countDownDate = new Date(destinationDate.replace(/ /g, "T")).getTime();
  var timer = setInterval(function () {
    var now = new Date().getTime();
    var timeleft = countDownDate - now;
    var days = Math.floor(timeleft / (1000 * 60 * 60 * 24));
    var hours = Math.floor(timeleft % (1000 * 60 * 60 * 24) / (1000 * 60 * 60));
    var minutes = Math.floor(timeleft % (1000 * 60 * 60) / (1000 * 60));
    var seconds = Math.floor(timeleft % (1000 * 60) / 1000);
    timeleft > 0 ? update(new Time(days, hours, minutes, seconds)) : cancelTimer();
  }, 1000);

  function Time(d, h, m, s) {
    this.days = leadingZero(d);
    this.hours = leadingZero(h);
    this.minutes = leadingZero(m);
    this.seconds = leadingZero(s);
  }

  Time.prototype.toString = function (params) {
    return "".concat(this.days, ":").concat(this.hours, ":").concat(this.minutes, ":").concat(this.seconds);
  };

  function leadingZero(value) {
    return value < 10 ? "0".concat(value) : "".concat(value);
  }

  function cancelTimer() {
    clearInterval(timer);
    update(new Time(0, 0, 0, 0));
  }

  return cancelTimer;
}

/***/ }),

/***/ "./src/modules/data-copy/index.js":
/*!****************************************!*\
  !*** ./src/modules/data-copy/index.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ dataCopy)
/* harmony export */ });
function dataCopy() {
  var root = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document;
  // Handle links sharing.
  root.addEventListener("click", function (event) {
    if (event.target.matches("button[data-copy]")) {
      navigator.clipboard.writeText(event.target.dataset.copy);
      alert("SKOPIOWANO URL:\n".concat(event.target.dataset.copy, "\n\uD83D\uDE04\uD83D\uDC4D"));
    }
  });
}

/***/ }),

/***/ "./src/modules/pistacja/plugin/index.js":
/*!**********************************************!*\
  !*** ./src/modules/pistacja/plugin/index.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1__);



// Pi-stacja plugins system.
var pie = function piePlugin() {
  function plugin(pluginCallback) {
    window.piePlugins = window.piePlugins || [];
    window.piePlugins.push(pluginCallback);
  }

  function init(userConfig) {
    var config = {};

    try {
      config = userConfig();
    } catch (error) {
      console.error("Pistacja Error: Problems with initial configuration.\n", error);
    }

    window.piePlugins = window.piePlugins || [];
    window.piePlugins.forEach( /*#__PURE__*/function () {
      var _ref = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__["default"])( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default().mark(function _callee(callPlugin) {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default().wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!(typeof callPlugin !== "function")) {
                  _context.next = 2;
                  break;
                }

                throw new Error("Plugin need to be a function");

              case 2:
                _context.prev = 2;
                _context.next = 5;
                return callPlugin(config);

              case 5:
                _context.next = 10;
                break;

              case 7:
                _context.prev = 7;
                _context.t0 = _context["catch"](2);
                console.error("Plugin ".concat(callPlugin.name, " erron.\n"), _context.t0);

              case 10:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[2, 7]]);
      }));

      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }());
    delete window.piePlugins;
  }

  return {
    plugin: plugin,
    init: init
  };
}();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (pie);

/***/ }),

/***/ "./src/modules/tabs-manager/index.js":
/*!*******************************************!*\
  !*** ./src/modules/tabs-manager/index.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ TabsManager)
/* harmony export */ });
/* harmony import */ var utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! utils */ "./src/modules/utils/index.js");
 // Switches tabs containers and applies active class.
// USAGE:

var css = function css(mobileBreakpoint) {
  return "\n  \n  .pie-tabs-hide-on-desktop {\n    display: none;\n  }\n  \n  @media (max-width: ".concat(mobileBreakpoint, "px) {\n    .pie-tabs-container {\n      top: 100%;     \n      left: 0;\n      right: 0;\n      bottom: 0;\n      margin: 0;\n      z-index: 100;\n      position: fixed;\n      overflow-y: auto;\n      overflow-x: hidden;\n      background-color: white;\n      transition: top .5s ease;\n    }\n      \n    .pie-tabs-container.show {\n      top: 3.4rem;\n    } \n\n    .pie-tabs-hide-on-mobile {\n      display: none;\n    }\n\n    .pie-tabs-hide-on-desktop {\n      display: flex;\n    }\n  }\n\n  .pie-tabs-container > *[data-tab] {\n    display: none;\n  }\n\n  .pie-tabs-container > *[data-tab].active {\n    display: block;\n  }      \n");
};

function TabsManager() {
  var mobileBreakpoint = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 860;
  var tabs = Array.from(document.querySelectorAll("[data-tab]"));
  var container = document.querySelector(".pie-tabs-container");
  var currentTab = tabs.find(function (t) {
    return t.classList.contains("active");
  });
  var currentButton = currentTab ? document.querySelector("button[data-tab-target].active") : null;
  (0,utils__WEBPACK_IMPORTED_MODULE_0__.insertCSS)(css(mobileBreakpoint), "tabs-styles");
  (0,utils__WEBPACK_IMPORTED_MODULE_0__.watchScreen)(function (width) {
    return {
      mobile: width < mobileBreakpoint
    };
  }, function (mode) {
    return currentButton && (mode === "mobile" ? currentButton.classList.remove("active") : currentButton.classList.add("active"));
  }, true);

  function deselectTabs() {
    container && container.classList.remove("show");
    currentButton && currentButton.classList.remove("active");
  }

  function selectTab(targetName, button) {
    currentButton && currentButton.classList.remove("active");
    currentButton = button instanceof HTMLElement ? button : document.querySelector("button[data-tab-target=\"".concat(targetName, "\"]"));
    currentTab && currentTab.classList.remove("active");
    currentTab = tabs.find(function (t) {
      return t.dataset.tab === targetName;
    });

    if (currentTab) {
      currentTab.classList.add("active");
      currentButton.classList.add("active");
      container && container.classList.add("show");
    }

    return currentTab;
  }

  document.addEventListener("click", function (event) {
    if (event.target.matches("button[data-tab-target]")) {
      currentTab = selectTab(event.target.dataset.tabTarget, event.target);
    } else if (event.target.matches("button[data-tab-close]")) {
      deselectTabs();
    }
  });
  return Object.freeze({
    selectTab: selectTab,
    getCurrentTab: function getCurrentTab() {
      return currentTab;
    },
    getCurrentButton: function getCurrentButton() {
      return currentButton;
    }
  });
}

/***/ }),

/***/ "./src/modules/utils/index.js":
/*!************************************!*\
  !*** ./src/modules/utils/index.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "debounce": () => (/* binding */ debounce),
/* harmony export */   "queryToObject": () => (/* binding */ queryToObject),
/* harmony export */   "uid": () => (/* binding */ uid),
/* harmony export */   "memo": () => (/* binding */ memo),
/* harmony export */   "isPrevious": () => (/* binding */ isPrevious),
/* harmony export */   "timeToSeconds": () => (/* binding */ timeToSeconds),
/* harmony export */   "insertCSS": () => (/* binding */ insertCSS),
/* harmony export */   "PieError": () => (/* binding */ PieError),
/* harmony export */   "memoElement": () => (/* binding */ memoElement),
/* harmony export */   "watchScreen": () => (/* binding */ watchScreen)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ "./node_modules/@babel/runtime/helpers/esm/slicedToArray.js");


function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

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
} // Extract search query from URL and parse it into JS object.
// Returns: {} OR {key:value, ...};

function queryToObject(url) {
  var searchParams = new URLSearchParams(url);
  var result = {};

  var _iterator = _createForOfIteratorHelper(searchParams.entries()),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var _step$value = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__["default"])(_step.value, 2),
          key = _step$value[0],
          value = _step$value[1];

      if (result[key]) {
        if (!Array.isArray(result[key])) {
          result[key] = [result[key]];
        }

        result[key].push(value);
      } else {
        result[key] = value;
      }
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  return result;
} // Geerate unique id.

var uid = function uid() {
  return "PIE.".concat((+new Date() + Math.random() * 100).toString(32));
}; // Modifier function with memory.

var memo = function memo(modifier, previous) {
  if (typeof modifier !== "function") throw "Modifier need to be a function.";
  return function (current) {
    // NOTE: To memoize previous value you need to return it from the 'modifier'.
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
} // Add <style> tag into Document's head.

function insertCSS(styles, name) {
  var override = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  var styleTag = override ? document.querySelector("style[data-name=\"".concat(name, "\"]")) || document.createElement("style") : document.createElement("style");
  if (name) styleTag.dataset.name = name;
  document.head.appendChild(styleTag).textContent = styles;
  return styleTag;
} // Create pistacja Error instance.

function PieError(error, host) {
  this.name = "PieError";

  if (error instanceof Error) {
    this.message = error.message;
    this.stack = error.stack;
  } else {
    this.message = error;
    this.stack = new Error().stack;
  }

  if (host) {
    this.host = host;
  }
}
PieError.prototype = new Error(); // Toggles given @klass on given @newElement removing its from the previouse one.
// USAGE:
// const avtivate = memoElement(htmlElement, "avtive");
// ...
// avtivate(newHtmlElement);
//

function memoElement(currentElement, klass) {
  var toggle = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  currentElement && currentElement.classList.add(klass);
  return function (newElement) {
    if (toggle && currentElement && currentElement === newElement) {
      currentElement.classList.toggle(klass);
    } else {
      currentElement && currentElement.classList.remove(klass);
      newElement && newElement.classList.add(klass); // eslint-disable-next-line no-param-reassign

      currentElement = newElement;
    }

    return currentElement;
  };
} // Runs callback only id screen mode changes.
// USAGE:

/*

import { watchScreen } from "utils";
. . .

watchScreen(width => ({ 
  mobile: width < 450, 
  tablet: width < 860 && width >= 450,
}), 
  (mode, isInitail) => console.log(mode, isInitail), 
  true
);

*/

function watchScreen(predicate, callback) {
  var emmitOnInit = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  var prevMode;
  var handler = debounce(function () {
    var screenWidth = window.innerWidth;
    var screenHeight = window.innerHeight;

    var _predicate = predicate(screenWidth, screenHeight),
        mobile = _predicate.mobile,
        tablet = _predicate.tablet;

    var mode = mobile ? "mobile" : tablet ? "tablet" : "desktop";

    if (prevMode !== mode) {
      callback(mode, prevMode === undefined);
      prevMode = mode;
    }
  }, 450);
  emmitOnInit && handler();
  window.addEventListener("resize", handler);
  return function () {
    return window.removeEventListener("resize", handler);
  };
}

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"./exam": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkIds[i]] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkpi_stacja_template"] = self["webpackChunkpi_stacja_template"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["vendor"], () => (__webpack_require__("./src/joomla/html/com_videos/item/exam/exam.js")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;