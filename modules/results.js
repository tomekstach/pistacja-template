/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/joomla/html/mod_finder_results/default/results.js":
/*!***************************************************************!*\
  !*** ./src/joomla/html/mod_finder_results/default/results.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! utils */ "./src/modules/utils/index.js");
/* harmony import */ var pistacja_plugin__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! pistacja/plugin */ "./src/modules/pistacja/plugin/index.js");
/* harmony import */ var custom_select__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! custom-select */ "./src/modules/custom-select/index.js");
/* harmony import */ var reveal_content__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! reveal-content */ "./src/modules/reveal-content/index.js");
/* harmony import */ var pistacja_uspp_modal__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! pistacja/uspp-modal */ "./src/modules/pistacja/uspp-modal/index.js");
// Modules.




 // Install Results plugin.

pistacja_plugin__WEBPACK_IMPORTED_MODULE_1__["default"].plugin(function Results(_ref) {
  var domain = _ref.domain;
  (0,custom_select__WEBPACK_IMPORTED_MODULE_2__["default"])(); // Handle USPP Modal.

  (0,pistacja_uspp_modal__WEBPACK_IMPORTED_MODULE_4__["default"])(domain); // Search results overflow tooltip.

  var reveal = (0,reveal_content__WEBPACK_IMPORTED_MODULE_3__["default"])(".pie-results-result-row-description", 48);
  reveal && window.addEventListener("resize", (0,utils__WEBPACK_IMPORTED_MODULE_0__.debounce)(function () {
    return reveal.reset();
  }, 400));
});

/***/ }),

/***/ "./src/modules/custom-select/index.js":
/*!********************************************!*\
  !*** ./src/modules/custom-select/index.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ customSelect)
/* harmony export */ });
/* harmony import */ var _styles_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./styles.scss */ "./src/modules/custom-select/styles.scss");
// Styles.
 // Custom select box, that can be used as one of the native form inputs (a.k.a will be added to the form send request).
// TODO: Add Usability + arrow-key navigation.
//
// USAGE:
// <div data-custom-select="type" data-selected-index="0">
//   <button data-option="value">Display</button>
//   ...
// </div>

function customSelect() {
  Array.from(document.querySelectorAll("*[data-custom-select]")).forEach(function (select) {
    var seletedOption; // Select display.

    var display = document.createElement("button");
    display.type = "button";
    display.classList = "custom-select-display ".concat(select.classList);
    display.textContent = select.dataset.title || "Wybierz pozycję";
    select.classList = ""; // Default selected index.

    var selectIndex = select.dataset.selectedIndex ? parseInt(select.dataset.selectedIndex) : null;
    var input = document.createElement("input");
    var isRequired = select.getAttribute("required") !== null;
    var optionsList = document.createElement("div");
    var defaultValue = input.getAttribute("value");
    optionsList.className = "custom-options-list custom-list-style"; // Set input properties.

    if (select.dataset.customSelect) {
      input.name = select.dataset.customSelect;
    }

    if (defaultValue) {
      input.value = defaultValue;
    }

    if (isRequired) {
      input.required = true;
    } // Move options into new container.


    Array.from(select.children).forEach(function (option, index) {
      // Select default option.
      if (typeof selectIndex === "number" && index === selectIndex) {
        option.classList.add("selected");
        seletedOption = option;
        display.textContent = option.textContent;
        input.value = seletedOption.dataset.option;
      }

      optionsList.appendChild(option);
    }); // Add select handler.

    select.addEventListener("click", function (event) {
      // Show droplist.
      if (event.target === display) {
        if (select.classList.toggle("open")) {
          document.body.addEventListener("click", closeOptionsList);
        } else {
          document.body.removeEventListener("click", closeOptionsList);
        } // Handle option select.

      } else if (event.target.matches("button[data-option]")) {
        event.preventDefault();
        seletedOption && seletedOption.classList.remove("selected");
        seletedOption = event.target;
        seletedOption.classList.add("selected");
        input.value = seletedOption.dataset.option;
        display.textContent = seletedOption.textContent;
        select.classList.remove("open");
        document.body.removeEventListener("click", closeOptionsList);
      }
    });

    function closeOptionsList(event) {
      if (!select.contains(event.target)) {
        select.classList.remove("open");
        document.body.removeEventListener("click", closeOptionsList);
      }
    } // Add seletcbox structure.


    select.appendChild(input);
    select.appendChild(display);
    select.appendChild(optionsList);
  });
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

/***/ "./src/modules/pistacja/uspp-modal/index.js":
/*!**************************************************!*\
  !*** ./src/modules/pistacja/uspp-modal/index.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ usppModal)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ "./node_modules/@babel/runtime/helpers/esm/slicedToArray.js");
/* harmony import */ var travrs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! travrs */ "./node_modules/travrs/dist/index.js");
/* harmony import */ var travrs__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(travrs__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var pistacja_modals__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! pistacja/modals */ "./src/modules/pistacja/modals/index.js");

// Modules.


function usppModal(domian) {
  var requertConfig = {
    mode: "cors",
    method: "post",
    cache: "default"
  };
  var modalController = (0,pistacja_modals__WEBPACK_IMPORTED_MODULE_2__.remoteModal)("uspp"); // No modal to display content.

  if (!modalController || !modalController.modal) return;

  var _template = (0,travrs__WEBPACK_IMPORTED_MODULE_1__.template)("\n    div.uspp-wrapper.stack\n      @content::div.uspp-content       \n      @link::a.bubble-button.green.KGSolid.--space-i > \"WSZYSTKIE ZASOBY DLA TEGO WYMAGANIA\"        \n  "),
      _template2 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__["default"])(_template, 2),
      content = _template2[0],
      refs = _template2[1];

  modalController.modal.appendChild(content);
  document.addEventListener("click", function (event) {
    if (!event.target.matches("button[data-uspp-id]")) return;
    refs.link.href = "".concat(domian, "wyniki-wyszukiwania?q=").concat(event.target.innerText); // Show modal.

    modalController.on(); // Display waiting msg. after 400ms.

    var timer = setTimeout(function () {
      refs.content.textContent = "Trwa ładowanie danych...";
    }, 400);
    fetch("".concat(domian, "cli/getpppname.php?code=").concat(event.target.dataset.usppId), requertConfig).then(function (r) {
      return r.json();
    }).then(function (_ref) {
      var level = _ref.level,
          name = _ref.name,
          subject = _ref.subject,
          section = _ref.section;
      clearTimeout(timer);
      refs.content.innerHTML = "\n          <div class=\"stack --medium\">\n            <h3 class=\"KGSolid text-green font-md rail --h-spread --v-start\">\n              <span>".concat(event.target.innerText, "</span>\n              <button class=\"ghost\" data-pie-modal-close=\"true\">\n                <svg class=\"icon sm\">\n                  <use href=\"").concat(domian, "/templates/pistacja/images/icons/pie-icons-sprite.svg#ui-close\">\n                </svg>\n              </button>\n            </h3>\n\n            <div class=\"text-gray\">").concat(name, "</div>\n          \n            <hr/>\n            <div>\n              <div>Przedmiot</div>\n              <strong class=\"text-green\">").concat(subject, "</strong>\n            </div>\n            <div>\n              <div>Poziom edukacyjny</div>\n              <strong class=\"text-green\">").concat(level, "</strong>\n            </div>\n            <div>\n              <div>Dzia\u0142</div>\n              <strong class=\"text-green\">").concat(section, "</strong>\n            </div>\n          </div>\n        "); // Redner MathML.

      window.MathJax && window.MathJax.typeset();
    })["catch"](function (err) {
      console.error(err);
      clearTimeout(timer);
      refs.content.textContent = "Błąd danych USPP; Przepraszamy.";
    });
  });
}

/***/ }),

/***/ "./src/modules/reveal-content/index.js":
/*!*********************************************!*\
  !*** ./src/modules/reveal-content/index.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ revealContent)
/* harmony export */ });
/* harmony import */ var utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! utils */ "./src/modules/utils/index.js");
/* harmony import */ var travrs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! travrs */ "./node_modules/travrs/dist/index.js");
/* harmony import */ var travrs__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(travrs__WEBPACK_IMPORTED_MODULE_1__);



var applyStyles = function applyStyles() {
  var color = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "white";
  (0,utils__WEBPACK_IMPORTED_MODULE_0__.insertCSS)("\n    button.reveal-content-open.active,\n    button.reveal-content-close.active {\n      right: 0;\n    }\n\n    button.reveal-content-open {\n      padding: 11px 0 0 40px;\n      line-height: 9px;\n    }\n\n    button.reveal-content-close {\n      padding: 0 0 0 40px;\n    }\n\n    button.reveal-content-open,\n    button.reveal-content-close {\n      margin: 0;\n      bottom: 0;\n      right: -60px;\n      outline: none;\n      display: block;\n      color: inherit;\n      user-select: none;\n      position: absolute;\n      transition: right 0.3s ease;\n      background: -moz-linear-gradient(left,  rgba(255,255,255,0) 0%, ".concat(color, " 70%);\n      background: -webkit-linear-gradient(left,  rgba(255,255,255,0) 0%, ").concat(color, " 70%);\n      background: linear-gradient(to right,   rgba(255,255,255,0) 0%, ").concat(color, " 70%);\n    };\n\n\n  "));
};

function revealContent(selector, displayHeight, bgColor) {
  if (!displayHeight) return;
  applyStyles(bgColor);
  var reveals = collectItems();

  function collectItems() {
    var collection = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    Array.from(document.querySelectorAll(selector)).forEach(function (item) {
      var id = (0,utils__WEBPACK_IMPORTED_MODULE_0__.uid)();
      var scroll = item.scrollHeight;

      if (scroll > displayHeight) {
        var openButton = (0,travrs__WEBPACK_IMPORTED_MODULE_1__.createElement)("button.reveal-content-open.active[data-reveal=\"".concat(id, "\"]"), "•••");
        var closeButton = (0,travrs__WEBPACK_IMPORTED_MODULE_1__.createElement)("button.reveal-content-close[data-reveal=\"".concat(id, "\"]"), "×");
        item.style.position = "relative";
        item.style.overflow = "hidden";
        item.style.height = "".concat(displayHeight, "px");
        item.style.transition = "height .3s ease";
        item.appendChild(openButton);
        item.appendChild(closeButton);
        collection[id] = {
          ref: item,
          open: openButton,
          close: closeButton,
          initHeight: item.offsetHeight
        };
      }
    });
    return collection;
  }

  document.addEventListener("click", function (event) {
    if (event.target.dataset && event.target.dataset.reveal) {
      var reveal = reveals[event.target.dataset.reveal];

      if (event.target.matches("button.reveal-content-open")) {
        reveal.ref.style.height = "".concat(reveal.ref.scrollHeight + 20, "px");
        reveal.open.classList.remove("active");
        reveal.close.classList.add("active");
        reveal.open.blur();
      } else if (event.target.matches("button.reveal-content-close")) {
        reveal.ref.style.height = "".concat(displayHeight, "px");
        reveal.open.classList.add("active");
        reveal.close.classList.remove("active");
        reveal.close.blur();
      }
    }
  });

  function reset() {
    Object.keys(reveals).forEach(function (key) {
      var reveal = reveals[key];
      reveal.open.remove();
      reveal.close.remove();
      reveal.ref.style.height = "auto";
      delete reveal[key];
    });
    reveals = collectItems(reveals);
  }

  function getReveals() {
    return Object.values(reveals).map(function (r) {
      return r.ref;
    });
  }

  return {
    reset: reset,
    getReveals: getReveals
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

/***/ "./src/modules/custom-select/styles.scss":
/*!***********************************************!*\
  !*** ./src/modules/custom-select/styles.scss ***!
  \***********************************************/
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
/******/ 			"./results": 0
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
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["vendor"], () => (__webpack_require__("./src/joomla/html/mod_finder_results/default/results.js")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;