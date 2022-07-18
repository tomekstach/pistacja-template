/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 587:
/***/ ((__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) => {


// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js
var asyncToGenerator = __webpack_require__(861);
// EXTERNAL MODULE: ./node_modules/@babel/runtime/regenerator/index.js
var regenerator = __webpack_require__(757);
var regenerator_default = /*#__PURE__*/__webpack_require__.n(regenerator);
;// CONCATENATED MODULE: ./src/modules/pistacja/plugin/index.js



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
      var _ref = (0,asyncToGenerator/* default */.Z)( /*#__PURE__*/regenerator_default().mark(function _callee(callPlugin) {
        return regenerator_default().wrap(function _callee$(_context) {
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

/* harmony default export */ const pistacja_plugin = (pie);
// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/slicedToArray.js
var slicedToArray = __webpack_require__(324);
;// CONCATENATED MODULE: ./src/modules/utils/index.js


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
      var _step$value = (0,slicedToArray/* default */.Z)(_step.value, 2),
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
;// CONCATENATED MODULE: ./src/modules/anchor-catch/index.js

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
        _extractSubjectAndOpt2 = (0,slicedToArray/* default */.Z)(_extractSubjectAndOpt, 2),
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
} // ---- Helpers ----------------

function isValidAnchor(element) {
  return element.nodeName === "A" && element.href && element.href.includes("#");
}

function extractSubjectAndOptions(href) {
  var index = href.indexOf("#");
  var params = href.slice(index + 1).split("?");
  var options = params[1] ? queryToObject("?".concat(params[1])) : undefined;
  return [params[0], options];
}
// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/defineProperty.js
var defineProperty = __webpack_require__(942);
// EXTERNAL MODULE: ./node_modules/travrs/dist/index.js
var dist = __webpack_require__(744);
;// CONCATENATED MODULE: ./src/joomla/html/mod_menu/portal/modules/user-portals/components/level-search.js



function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0,defineProperty/* default */.Z)(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

// Components.
 // Search by Education Level.

function levelSearch() {
  var metadata = {
    searchType: "level",
    userType: undefined
  };

  var _template = (0,dist.template)("\n    div.pie-search-popup\n      @header::div.pie-search-popup-searchbox[data-header=\"Wyszukaj dla poziomu edukacyjnego\"]\n        @form::form[method=\"GET\" action=\"./wyniki-wyszukiwania\"]\n          @input::input[type=\"text\" name=\"q\" placeholder=\"np: u\u0142amki\"]\n          @options::div.pie-search-popup-select[data-custom-select=\"tsubject\" value=\"0\" data-title=\"Przedmiot\"]\n          button.btn.searchbtn.pie-icon-right-arrow-18\n        button.btn.close-search\n  "),
      _template2 = (0,slicedToArray/* default */.Z)(_template, 2),
      root = _template2[0],
      refs = _template2[1];

  var c = Array.from(document.querySelectorAll("div.pie-chalk-select[data-custom-select=\"tsubject\"] button")).forEach(function (option) {
    var clone = option.cloneNode(true);
    clone.className = "";
    refs.options.appendChild(clone);
  });
  document.body.appendChild(root);

  root.onclick = function (event) {
    event.target === root && root.classList.remove("open");
  };

  function updateHeader(content) {
    refs.header.dataset.header = "Wyszukaj w: ".concat(content);
  }

  refs.input.onkeydown = function (event) {
    if (event.code === "Enter") {
      event.preventDefault();
      refs.form.submit();
    }
  }; // Analytics tracking.


  refs.form.onsubmit = function (event) {
    var form = new FormData(event.target);
    var query = form.get("q");
    window.dataLayer.push(_objectSpread({
      event: "context-search",
      searchPhrase: query
    }, metadata));
  };

  return {
    show: function show(level, user) {
      metadata.userType = user;
      updateHeader(level);
      root.classList.add("open");
      refs.input.focus();
    }
  };
}
;// CONCATENATED MODULE: ./src/joomla/html/mod_menu/portal/modules/user-portals/components/phrase-search.js



function phrase_search_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function phrase_search_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? phrase_search_ownKeys(Object(source), !0).forEach(function (key) { (0,defineProperty/* default */.Z)(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : phrase_search_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

// Components.
 // Search phrase.

function phraseSearch() {
  var metadata = {
    searchType: "phrase",
    userType: undefined
  };

  var _template = (0,dist.template)("\n    div.pie-search-popup\n      div.pie-search-popup-searchbox[data-header=\"Szukaj po s\u0142owie kluczowym\"]\n        @form::form[method=\"GET\" action=\"./wyniki-wyszukiwania\"]\n          @input::input[type=\"text\" name=\"q\" placeholder=\"np: u\u0142amki\"]\n          button.searchbtn.pie-icon-right-arrow-18\n        button.close-search\n  "),
      _template2 = (0,slicedToArray/* default */.Z)(_template, 2),
      root = _template2[0],
      refs = _template2[1];

  document.body.appendChild(root);

  root.onclick = function (event) {
    event.target === root && root.classList.remove("open");
  }; // Analytics tracking.


  refs.form.onsubmit = function (event) {
    var form = new FormData(event.target);
    var query = form.get("q");
    window.dataLayer.push(phrase_search_objectSpread({
      event: "context-search",
      searchPhrase: query
    }, metadata));
  };

  return {
    show: function show(user) {
      metadata.userType = user;
      root.classList.add("open");
      refs.input.focus();
    }
  };
}
;// CONCATENATED MODULE: ./src/modules/highlight/index.js

// Wrap parts of @text with <em> tags that matches with given @phrases.
//
// USAGE:
//
// const result = highlight("Good and goofy", "go, fy");
// console.log(result); // <em>Go</em>od and <em>go</em>o<em>fy</em>
//
function highlight(text, phrases) {
  if (!phrases.length) return text;
  var result;
  var matches = [];
  var regexp = phrasesToRegex(phrases); // eslint-disable-next-line no-cond-assign

  while (result = regexp.exec(text)) {
    matches.push([result.index, result.index + result[0].length]);
  }

  var hlight = matches.reverse().reduce(function (acc, _ref) {
    var _ref2 = (0,slicedToArray/* default */.Z)(_ref, 2),
        start = _ref2[0],
        end = _ref2[1];

    return "".concat(acc.slice(0, start), "<em>").concat(acc.slice(start, end), "</em>").concat(acc.slice(end));
  }, text);
  return hlight;
}

function phrasesToRegex(phrases) {
  var words = phrases.split(",");
  var regex = words.length > 1 ? words.reduce(function (acc, ph) {
    var trimmed = ph.trim();
    return trimmed.length ? "".concat(acc).concat(trimmed, "|") : acc;
  }, "") : "".concat(words[0], "|");
  return new RegExp(regex.slice(0, -1), "gi");
}
;// CONCATENATED MODULE: ./src/joomla/html/mod_menu/portal/modules/user-portals/components/subject-search.js



function subject_search_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function subject_search_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? subject_search_ownKeys(Object(source), !0).forEach(function (key) { (0,defineProperty/* default */.Z)(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : subject_search_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

// Components.

 // Search within subject list.

function subjectSearch() {
  var metadata = {
    searchType: "subject",
    userType: undefined
  };
  var subjectList = Array.from(document.querySelectorAll(".search-subject")).map(function (element) {
    var anchor = element.querySelector("a");
    return {
      ui: anchor,
      ref: element,
      topic: anchor.textContent
    };
  });

  var _template = (0,dist.template)("\n    div.pie-search-popup\n      @popup::div.pie-search-popup-searchbox[data-header=\"Wyszukaj temat na li\u015Bcie\"]\n        form[autocomplete=\"off\" onSubmit=\"return false\"]\n          @input::input[type=\"text\" placeholder=\"Zacznij pisa\u0107, aby rozpocz\u0105\u0107 wyszukiwanie np: liczby\"]\n        @results::div.pie-search-popup-filter-results\n        button.close-search\n  "),
      _template2 = (0,slicedToArray/* default */.Z)(_template, 2),
      root = _template2[0],
      refs = _template2[1];

  subjectList.forEach(function (entry) {
    return refs.results.appendChild(entry.ref);
  });
  document.body.appendChild(root);
  refs.input.addEventListener("input", filterSubjects, false);

  function filterSubjects(event) {
    if (event.keyCode === 13) {
      event.preventDefault();
      return false;
    }

    var phrase = event.target.value.toLowerCase();
    subjectList.forEach(function (entry) {
      if (phrase.length && entry.topic.toLowerCase().includes(phrase)) {
        entry.ref.classList.add("filter-visible");
        entry.ui.innerHTML = highlight(entry.topic, phrase);
      } else entry.ref.classList.remove("filter-visible");
    });
  }

  root.onclick = function (event) {
    if (event.target === root) {
      root.classList.remove("open"); // Clear results list when it's hidden.

      setTimeout(function () {
        filterSubjects({
          target: {
            value: ""
          }
        });
        refs.input.value = "";
      }, 300);
    }
  }; // Analytics.


  refs.results.addEventListener("click", function (event) {
    if (event.target.nodeName === "A") {
      window.dataLayer.push(subject_search_objectSpread({
        event: "context-search",
        searchPhrase: event.target.textContent
      }, metadata));
    }
  });
  return {
    show: function show(user) {
      metadata.userType = user;
      root.classList.add("open");
      refs.input.focus();
    }
  };
}
;// CONCATENATED MODULE: ./src/joomla/html/mod_menu/portal/modules/user-portals/index.js
// Modules.



 // Styles.

 // NOTE:
// Modules handles the interactions in user-portals: Dla ucznia, DLa nauczyciela, Dla rodzica
// along with searchboxe popups for different types of search.

function UserPortals() {
  var userPortals = anchorCatch(".pie-content"); // Context Searchboxes.

  var levelContextSearch = levelSearch();
  var phraseContextSearch = phraseSearch();
  var subjectContextSearch = subjectSearch();
  var levelMap = ["Szkoła podstawowa kl. IV-VI", "Szkoła podstawowa kl. VII-VIII", "Szkoła ponadpodstawowa"]; // Catch Collapse Menus.

  userPortals["catch"]("collapse", function (_, target) {
    // Set height.
    target.nextElementSibling.style.maxHeight = target.dataset.open !== "true" ? "300px" : "0px"; // Toggle open flag.

    target.dataset.open = !target.dataset.open || target.dataset.open === "false" ? "true" : "false";
  }); // Show Context Searchbox.

  userPortals["catch"]("search", function (options) {
    var index = options.index,
        type = options.type,
        user = options.user;

    switch (type) {
      case "levels":
        levelContextSearch.show(levelMap[+index], user);
        break;

      case "phrase":
        phraseContextSearch.show(user);
        break;

      case "subjects":
        return subjectContextSearch.show(user);

      default:
        throw new Error("Unknow context search type");
    }
  });
}
;// CONCATENATED MODULE: ./src/joomla/html/mod_menu/portal/portal.js
// Modules.
 // Local modules.

 // Install Portal plugin.

pistacja_plugin.plugin(UserPortals);

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
/******/ 	/* webpack/runtime/runtimeId */
/******/ 	(() => {
/******/ 		__webpack_require__.j = 827;
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
/******/ 			827: 0
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
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, [736], () => (__webpack_require__(587)))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=portal.js.map