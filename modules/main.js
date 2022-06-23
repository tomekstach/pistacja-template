/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/modules/lsm/index.js":
/*!**********************************!*\
  !*** ./src/modules/lsm/index.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ createLSM)
/* harmony export */ });
function createLSM() {
  var api = {};
  var lsKey = "ked.pistacja";
  var storage = window.localStorage.getItem(lsKey) ? JSON.parse(localStorage.getItem(lsKey)) : {}; // Set message state.

  storage["hide-navigation-message"] = window.pieLsmName === storage.name;
  saveToLocalStorage();

  api.get = function (key) {
    return storage[key] !== undefined ? storage[key] : undefined;
  };

  api.set = function (key, value) {
    storage[key] = value;
    saveToLocalStorage();
    return value;
  };

  api.remove = function () {
    for (var _len = arguments.length, keys = new Array(_len), _key = 0; _key < _len; _key++) {
      keys[_key] = arguments[_key];
    }

    keys.forEach(function (key) {
      if (typeof key === "string" && storage.hasOwnProperty(key)) {
        delete storage[key];
      }
    });
    saveToLocalStorage();
  };

  api.clear = function () {
    Object.keys(storage).forEach(function (key) {
      return delete storage[key];
    });
    saveToLocalStorage();
  }; // ---- Helpers ----------------


  function saveToLocalStorage() {
    window.localStorage.setItem(lsKey, JSON.stringify(storage));
  }

  ;
  return api;
}
;

/***/ }),

/***/ "./src/modules/main.js":
/*!*****************************!*\
  !*** ./src/modules/main.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _joomla_template_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../joomla/template.scss */ "./src/joomla/template.scss");
/* harmony import */ var lsm__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! lsm */ "./src/modules/lsm/index.js");
/* harmony import */ var pistacja_plugin__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! pistacja/plugin */ "./src/modules/pistacja/plugin/index.js");
/* harmony import */ var pistacja_modals__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! pistacja/modals */ "./src/modules/pistacja/modals/index.js");
/* harmony import */ var pistacja_feedback__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! pistacja/feedback */ "./src/modules/pistacja/feedback/index.js");
/* harmony import */ var remote_class_toggle__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! remote-class-toggle */ "./src/modules/remote-class-toggle/index.js");
/* harmony import */ var orientation_tracker__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! orientation-tracker */ "./src/modules/orientation-tracker/index.js");


// Template styles.
 // Modules.






 // Template version.

console.log("pi-stacja-template v".concat("2.14.0")); // Text copied listener

document.addEventListener("copy", function (event) {
  var pagelink = "\n\n\u0179r\xF3d\u0142o: https://pistacja.tv/";
  var regex = /^(http|https):\/\//;

  if (regex.test(document.getSelection())) {
    event.clipboardData.setData("text", document.getSelection());
  } else {
    event.clipboardData.setData("text", document.getSelection() + pagelink);
  }

  event.preventDefault();
}); // Wait for pahe to load.

document.addEventListener("DOMContentLoaded", /*#__PURE__*/(0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__["default"])( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default().mark(function _callee() {
  var $, domain, lsm, messges, navigationMessge, hideMessage, contact;
  return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default().wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          $ = document.querySelector.bind(document);
          domain = $("a.pie-logo").href;
          lsm = (0,lsm__WEBPACK_IMPORTED_MODULE_3__["default"])(); // Handle system Messages.

          messges = $(".system-messages");
          messges && messges.addEventListener("click", function (event) {
            if (event.target.dataset.close !== "true") return;
            event.target.parentNode.style.display = "none";
          }); // Handle Navigation Messages.

          navigationMessge = $(".pie-top-navigation-message");

          if (navigationMessge) {
            hideMessage = lsm.get("hide-navigation-message");

            if (!hideMessage) {
              navigationMessge.style.display = "block";
              navigationMessge.addEventListener("click", function (event) {
                // Show on next reload.
                if (event.target.dataset.close === "true") {
                  navigationMessge.style.display = "none";
                  lsm.set("hide-navigation-message", true);
                } // Do not show again.
                else {
                  navigationMessge.style.display = "none";
                  lsm.set("hide-navigation-message", true);
                  lsm.set("name", window.pieLsmName);
                }
              });
            }
          } // Install feedback button.


          contact = $(".pie-contact-ref");

          if (contact) {
            (0,pistacja_feedback__WEBPACK_IMPORTED_MODULE_6__["default"])({
              action: contact.href,
              mount: $(".top-menu"),
              classes: ".only-mobile"
            });
            (0,pistacja_feedback__WEBPACK_IMPORTED_MODULE_6__["default"])({
              action: contact.href,
              mount: document.body,
              classes: ".only-desktop"
            });
          } // Pi-stacja glaobal object.


          pistacja_plugin__WEBPACK_IMPORTED_MODULE_4__["default"].init(function () {
            return {
              version: "v".concat("2.14.0"),
              // eslint-disable-line
              remoteClassToggle: (0,remote_class_toggle__WEBPACK_IMPORTED_MODULE_7__["default"])(),
              orientation: (0,orientation_tracker__WEBPACK_IMPORTED_MODULE_8__["default"])(),
              modals: (0,pistacja_modals__WEBPACK_IMPORTED_MODULE_5__["default"])(),
              // Initialize modals.
              domain: domain
            };
          });

        case 10:
        case "end":
          return _context.stop();
      }
    }
  }, _callee);
})));
/*%% DEV_ONLY %%*/
// NOTE: For testing purpose only. It'll be removed in production build.//

window._pistacja_ = {};
/*%% DEV_ONLY %%*/

/***/ }),

/***/ "./src/modules/orientation-tracker/index.js":
/*!**************************************************!*\
  !*** ./src/modules/orientation-tracker/index.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ orientationTracker)
/* harmony export */ });
/* harmony import */ var utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! utils */ "./src/modules/utils/index.js");
 // Detects type of device and orientation change.

function orientationTracker() {
  var onChangeCallbacks = [];

  function onChange(callback) {
    var emmitOnInit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    onChangeCallbacks.push(callback);
    emmitOnInit && callback(calculateDevice());
  }

  function removeListener(callback) {
    var index = onChangeCallbacks.indexOf(callback);
    ~index && onChangeCallbacks.splice(index, 1);
  }

  window.addEventListener("resize", (0,utils__WEBPACK_IMPORTED_MODULE_0__.debounce)(function () {
    return onChangeCallbacks.forEach(function (callback) {
      var currentDevice = calculateDevice();
      callback(currentDevice);
    });
  }, 450));
  return {
    onChange: onChange,
    removeListener: removeListener,

    get device() {
      return calculateDevice();
    }

  };
} // ---- HELPERS ----------------

function calculateDevice() {
  var screenWidth = window.innerWidth;
  var screenHeight = window.innerHeight;
  var userAgent = navigator.userAgent.toLowerCase();
  var mobile = isMobile(userAgent);
  var tablet = isTablet(userAgent, screenWidth, screenHeight);
  var desktop = !mobile && !tablet;
  return Object.freeze({
    mobile: mobile,
    tablet: tablet,
    desktop: desktop,
    screenWidth: screenWidth,
    screenHeight: screenHeight,

    get orientation() {
      return getOrientation();
    }

  });
}

function isMobile(userAgent) {
  return !!userAgent.match(/(mobile|iphone)/i) && "ontouchstart" in document.documentElement;
}

function isTablet(userAgent, w, h) {
  return !!userAgent.match(/(mobile|tablet|ipad|android)/i) && (w >= 1024 && w >= 600 || h >= 1024 && w >= 600);
}

function getOrientation() {
  return window.matchMedia("(orientation: portrait)").matches ? "portrait" : window.matchMedia("(orientation: landscape)").matches ? "landscape" : undefined;
}

/***/ }),

/***/ "./src/modules/pistacja/feedback/index.js":
/*!************************************************!*\
  !*** ./src/modules/pistacja/feedback/index.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ feedbackButton)
/* harmony export */ });
/* harmony import */ var travrs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! travrs */ "./node_modules/travrs/dist/index.js");
/* harmony import */ var travrs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(travrs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _styles_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./styles.scss */ "./src/modules/pistacja/feedback/styles.scss");


function feedbackButton(_ref) {
  var mount = _ref.mount,
      _ref$action = _ref.action,
      action = _ref$action === void 0 ? "/" : _ref$action,
      _ref$classes = _ref.classes,
      classes = _ref$classes === void 0 ? "" : _ref$classes;
  mount.appendChild((0,travrs__WEBPACK_IMPORTED_MODULE_0__.template)("\n    form.pie-feedback".concat(classes, "[method=\"POST\" action=\"").concat(action, "\"]\n      input[name=\"url\" type=\"hidden\" value=\"").concat(window.location.pathname, "\"]\n      button.rail.--medium.bubble-button.green[type=\"submit\"]\n        i.material-icons > \"feedback\"\n        span > \"Kontakt\"\n  ")));
}

/***/ }),

/***/ "./src/modules/pistacja/modals/index.js":
/*!**********************************************!*\
  !*** ./src/modules/pistacja/modals/index.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Modals),
/* harmony export */   "remoteModal": () => (/* binding */ remoteModal)
/* harmony export */ });
/* harmony import */ var travrs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! travrs */ "./node_modules/travrs/dist/index.js");
/* harmony import */ var travrs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(travrs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var perfect_scrollbar__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! perfect-scrollbar */ "./node_modules/perfect-scrollbar/dist/perfect-scrollbar.esm.js");
/* harmony import */ var perfect_scrollbar_css_perfect_scrollbar_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! perfect-scrollbar/css/perfect-scrollbar.css */ "./node_modules/perfect-scrollbar/css/perfect-scrollbar.css");
/* harmony import */ var _styles_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./styles.scss */ "./src/modules/pistacja/modals/styles.scss");

 // Styles.


 // Handles all pi-stacja modals.

function Modals() {
  var currentModal;
  var listeners = [];
  var root = document.querySelector("div.pie-modal-root") || (0,travrs__WEBPACK_IMPORTED_MODULE_0__.createElement)("div.pie-modal-root");
  document.body.appendChild(root); // Get all modals from the page.

  var modals = Array.from(document.querySelectorAll("*[data-pie-modal]")).reduce(function (acc, modal) {
    acc[modal.dataset.pieModal] = modal;
    var scrollContent = modal.querySelector(".scroll-content");

    if (scrollContent) {
      new perfect_scrollbar__WEBPACK_IMPORTED_MODULE_1__["default"](scrollContent);
    }

    root.appendChild(modal);
    return acc;
  }, {});
  document.addEventListener("click", function (event) {
    // Hide.
    if (!event.target.dataset.pieModalTrigger) {
      if (event.target === root || event.target.dataset.pieModalClose) {
        root.classList.remove("root-open");

        if (currentModal) {
          currentModal.classList.remove("modal-open");
          setTimeout(function () {
            listeners.forEach(function (listener) {
              return listener(currentModal.dataset.pieModal, "hide", currentModal);
            });
          }, 350);
        }
      }

      return;
    } // Select & show.


    currentModal = modals[event.target.dataset.pieModalTrigger];

    if (currentModal) {
      currentModal.classList.add("modal-open");
      root.classList.add("root-open");
      listeners.forEach(function (listener) {
        return listener(currentModal.dataset.pieModal, "show", currentModal);
      });
    }
  });
  return {
    listen: function listen(callback) {
      !listeners.includes(callback) && listeners.push(callback);
      return function cleanup() {
        var index = listeners.indexOf(callback);
        listeners.splice(index, 1);
      };
    }
  };
} // Allows for remote controll of targeted modal from JS code.

function remoteModal(modalName) {
  var $ = document.querySelector.bind(document);
  var selector = "button.remote-pie-modal-btn[data-pie-modal-trigger=\"".concat(modalName, "\"]");
  var trigger = $(selector) || (0,travrs__WEBPACK_IMPORTED_MODULE_0__.createElement)(selector);
  var modal = $("*[data-pie-modal=\"".concat(modalName, "\"]"));
  var root = $("div.pie-modal-root");
  if (!root || !modal) return;
  document.body.appendChild(trigger);
  return {
    on: function on() {
      return trigger.click();
    },
    off: function off() {
      return root.click();
    },
    modal: modal
  };
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

/***/ "./src/modules/remote-class-toggle/index.js":
/*!**************************************************!*\
  !*** ./src/modules/remote-class-toggle/index.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ remoteClassToggle)
/* harmony export */ });
// Allows to remotely switch certain class in one element by clicking on another element.
function remoteClassToggle() {
  // List of events subscribers.
  var eventCallbacks = []; // Collect all targets on the page.

  var targets = Array.from(document.querySelectorAll("*[data-rct-target]") || []).reduce(function (acc, target) {
    acc[target.dataset.rctTarget] = target;
    return acc;
  }, {});

  function clickHandler(event) {
    var dataset = event.target.dataset;
    if (!dataset || !dataset.rctTrigger) return; // Apply for multiple targets.

    if (dataset.rctTrigger.includes(" ")) {
      dataset.rctTrigger.split(" ").forEach(function (targetName) {
        var target = targets[targetName];
        target && handleUpdate(targetName, target, event.target, dataset);
      });
    } // Apply for single target.
    else {
      var target = targets[dataset.rctTrigger];
      target && handleUpdate(dataset.rctTrigger, target, event.target, dataset);
    }
  }

  function handleUpdate(targetName, target, trigger, dataset) {
    // Appply calsses.
    dataset.rctAdd && dataset.rctAdd.split(" ").forEach(function (c) {
      return target.classList.add(c);
    });
    dataset.rctRemove && dataset.rctRemove.split(" ").forEach(function (c) {
      return target.classList.remove(c);
    });
    dataset.rctToggle && dataset.rctToggle.split(" ").forEach(function (c) {
      return target.classList.toggle(c);
    }); // Notify subscribers.

    eventCallbacks.length && eventCallbacks.forEach(function (callback) {
      return callback({
        targetName: targetName,
        target: target,
        trigger: trigger
      });
    });
  }

  document.addEventListener("click", clickHandler); // Cleanup.

  function cleanup(callback) {
    // Remove only given callback.
    if (callback) {
      var index = eventCallbacks.indexOf(callback);
      eventCallbacks.splice(index, 1);
    } // Full cleanup.
    else {
      document.removeEventListener("click", clickHandler);
      targets = null;
      eventCallbacks = null;
    }
  }

  function listener(callback) {
    eventCallbacks.push(callback);
  }

  function add(target) {
    if (target.dataset.rctTarget && !targets[target.dataset.rctTarget]) {
      targets[target.dataset.rctTarget] = target;
    }
  }

  return {
    listener: listener,
    cleanup: cleanup,
    add: add
  };
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

/***/ }),

/***/ "./src/joomla/template.scss":
/*!**********************************!*\
  !*** ./src/joomla/template.scss ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/modules/pistacja/feedback/styles.scss":
/*!***************************************************!*\
  !*** ./src/modules/pistacja/feedback/styles.scss ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/modules/pistacja/modals/styles.scss":
/*!*************************************************!*\
  !*** ./src/modules/pistacja/modals/styles.scss ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


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
/******/ 			"./main": 0
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
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["vendor"], () => (__webpack_require__("./src/modules/main.js")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;