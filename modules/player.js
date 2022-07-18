/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 77:
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
;// CONCATENATED MODULE: ./src/modules/data-copy/index.js
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
;// CONCATENATED MODULE: ./src/modules/tabs-manager/index.js
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
  insertCSS(css(mobileBreakpoint), "tabs-styles");
  watchScreen(function (width) {
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
;// CONCATENATED MODULE: ./src/joomla/html/com_videos/item/default/player/modules/yt-player/index.js
function YTPlayer(id) {
  var width = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 560;
  var height = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 315;
  return new Promise(function (resolve, reject) {
    var player;
    var playCallback;
    var stopCallback; // Run when YouTube player is ready.

    window.onYouTubePlayerAPIReady = function YTPlayerReady() {
      var container = document.getElementById(id);

      if (!container) {
        return reject("No container found for id: \"".concat(id, "\""));
      } // eslint-disable-next-line


      player = new YT.Player(id, {
        width: width,
        height: height,
        videoId: container.dataset.videoid,
        playerVars: {
          rel: 0,
          modestbranding: 1
        },
        events: {
          onReady: playerIsReady,
          onStateChange: playerStateChange
        }
      });
    }; // sandbox="allow-forms allow-scripts allow-pointer-lock allow-same-origin allow-top-navigation"
    // Remove pistacja loader.


    function playerIsReady() {
      var loader = document.querySelector(".pie-loader");
      loader && loader.parentNode.removeChild(loader); // Attach handlers.

      player.onStop = function (callback) {
        stopCallback = callback;
      };

      player.onPlay = function (callback) {
        playCallback = callback;
      };

      player.fullscreen = function () {
        var requestFullScreen = iframe.requestFullScreen || iframe.mozRequestFullScreen || iframe.webkitRequestFullScreen;
        requestFullScreen && requestFullScreen.bind(container)();
      };

      resolve(player);
    } // Handle player's state change.


    function playerStateChange(event) {
      if (event.data === 1) {
        playCallback && playCallback(event.target.getCurrentTime());
      } else if (event.data === 2) {
        stopCallback && stopCallback(event.target.getCurrentTime());
      }
    }
  });
}
// EXTERNAL MODULE: ./node_modules/travrs/dist/index.js
var dist = __webpack_require__(744);
// EXTERNAL MODULE: ./node_modules/perfect-scrollbar/dist/perfect-scrollbar.esm.js
var perfect_scrollbar_esm = __webpack_require__(772);
;// CONCATENATED MODULE: ./src/modules/pistacja/modals/index.js

 // Styles.


 // Handles all pi-stacja modals.

function Modals() {
  var currentModal;
  var listeners = [];
  var root = document.querySelector("div.pie-modal-root") || createElement("div.pie-modal-root");
  document.body.appendChild(root); // Get all modals from the page.

  var modals = Array.from(document.querySelectorAll("*[data-pie-modal]")).reduce(function (acc, modal) {
    acc[modal.dataset.pieModal] = modal;
    var scrollContent = modal.querySelector(".scroll-content");

    if (scrollContent) {
      new PerfectScrollbar(scrollContent);
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
  var trigger = $(selector) || (0,dist.createElement)(selector);
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
;// CONCATENATED MODULE: ./src/joomla/html/com_videos/item/default/player/modules/exercises/analytics.js
function analytics() {
  var exercise;
  var startTime;

  function startRecording(exerciseTitle) {
    startTime = Date.now();
    exercise = exerciseTitle;
  }

  function stopRecording() {
    var timeEllapsed = Date.now() - startTime;
    window.dataLayer.push({
      event: "player-exercise",
      timeValue: humanTime(timeEllapsed),
      customValue: exercise
    });
  }

  document.addEventListener("click", function (_ref) {
    var target = _ref.target;

    if (target.matches("button.pie-player-playlist-button")) {
      startRecording(target.dataset.exercise);
    } else if (target.matches("div.pie-modal-root") || target.matches("button.pie-player-exercises-modal-close")) {
      stopRecording();
    }
  });
  return {
    start: function start(title) {
      return startRecording(title);
    }
  };
} // ---- Helpers ----------------

function humanTime(millis) {
  var minutes = Math.floor(millis / 60000);
  var seconds = (millis % 60000 / 1000).toFixed(0);
  return "".concat(minutes < 10 ? "0" : "").concat(minutes, ":").concat(seconds < 10 ? "0" : "").concat(seconds);
}
;// CONCATENATED MODULE: ./src/joomla/html/com_videos/item/default/player/modules/exercises/cleaner.js
// Module that handles exercise popup close event and makes sure to reset iframe "src"
// This is mainly for the video players to stop them form playing when modal is closed.
// FIXME: This need to be changed. It can only handle the exercises assigned to the video
//        it won't work with exercises in playlist that are interactive-video.
//        Solution for that would be actualt acces the player instance and stop move
//        instead forcing rsc reset.
function exerciseCleaner(modals) {
  modals && modals.listen(function (name, state, modal) {
    if (name === "exercises" && state === "hide") {
      var iframe = modal.querySelector("iframe");
      if (iframe) iframe.src = "";
    }
  });
}
;// CONCATENATED MODULE: ./src/joomla/html/com_videos/item/default/player/modules/exercises/index.js







function Exercises(modals) {
  var _queryToObject = queryToObject(window.location.search),
      exercise = _queryToObject.exercise;

  var modalController = remoteModal("exercises");
  var model = window.pie_video_exercises;
  delete window.pie_video_exercises; // Initialize Analytics for exercises.

  var tracker = analytics(); // Install Exercise cleaner.

  exerciseCleaner(modals); // For Exercises in playlist.

  if (modalController.modal.dataset.exUrl) {
    var _modalController$moda = modalController.modal.dataset,
        exUrl = _modalController$moda.exUrl,
        exTitle = _modalController$moda.exTitle;
    modalController.modal.appendChild(videoExercise(exTitle, exUrl));
    tracker.start(exTitle);
  } // For Exercises in video (URL).
  else if (exercise) {
    var _model$exercise = model[exercise],
        title = _model$exercise.title,
        url = _model$exercise.url,
        video = _model$exercise.video;
    modalController.modal.appendChild(videoExercise(title, url, video));
    modalController.on();
    tracker.start(title);
  }
}

function videoExercise(title, url, video) {
  var _template = (0,dist.template)("\n    div.pie-player-exercises-modal-container.stack.--medium\n      div.rail.--h-spread.--stretch\n        @header::h2.KGSolid.text-green.font-xl > \"Zadanie\"\n        div.rail.--zero\n          @fullscreen::button.pie-icon-fullscreen-18\n          button.pie-player-exercises-modal-close.pie-icon-close-18[data-pie-modal-close=\"true\"]\n      @video::div.subheader\n      @player::iframe[width=\"100%\" height=\"100%\" scrolling=\"yes\" frameborder=\"0\" allowfullscreen]\n    "),
      _template2 = (0,slicedToArray/* default */.Z)(_template, 2),
      content = _template2[0],
      refs = _template2[1]; // Set content.


  refs.player.src = url;
  refs.header.textContent = title;
  refs.fullscreen.addEventListener("click", function () {
    if (content.parentNode.classList.toggle("fullscreen")) {
      refs.fullscreen.classList.add("pie-icon-smallscreen-18");
      refs.fullscreen.classList.remove("pie-icon-fullscreen-18");
    } else {
      refs.fullscreen.classList.add("pie-icon-fullscreen-18");
      refs.fullscreen.classList.remove("pie-icon-smallscreen-18");
    }
  });

  if (video) {
    refs.video.textContent = "Zadanie do wideo: ".concat(video);
  } else {
    refs.video.remove();
  }

  return content;
}
;// CONCATENATED MODULE: ./src/modules/pistacja/uspp-modal/index.js

// Modules.


function usppModal(domian) {
  var requertConfig = {
    mode: "cors",
    method: "post",
    cache: "default"
  };
  var modalController = remoteModal("uspp"); // No modal to display content.

  if (!modalController || !modalController.modal) return;

  var _template = (0,dist.template)("\n    div.uspp-wrapper.stack\n      @content::div.uspp-content       \n      @link::a.bubble-button.green.KGSolid.--space-i > \"WSZYSTKIE ZASOBY DLA TEGO WYMAGANIA\"        \n  "),
      _template2 = (0,slicedToArray/* default */.Z)(_template, 2),
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
;// CONCATENATED MODULE: ./src/joomla/html/com_videos/item/default/player/modules/transcript/index.js

 // Higlihghts video's subtitles accordign to display time and allows to jump
// to specific moment in the video by cllicking on the subtitle link.

function Transcript(player) {
  var transcriptContent = document.querySelector(".pie-tabs-transcript"); // Exit if no transcript.

  if (!player || !transcriptContent) {
    return;
  }

  var videoTranscript = anchorCatch(transcriptContent);
  var clock = createClock(collectTranscriptiom(transcriptContent), transcriptContent); // Catch click event on a subtitle link.

  videoTranscript["catch"]("seek", function (options) {
    player.seekTo(timeToSeconds(options.time));
    player.playVideo();
  });
  player.onStop(function () {
    return clock.stop();
  });
  player.onPlay(function (time) {
    return clock.play(Math.floor(time));
  }); // Create map object from all transcription links.

  function collectTranscriptiom(root) {
    return Array.from(root.querySelectorAll("a")).reduce(function (acc, link) {
      var time = timeToSeconds(link.href.slice(-8));
      acc[time] = link;
      return acc;
    }, {});
  } // Timing mechanism.


  function createClock(timetable, content) {
    var timer; // NOTE:
    // This will activate fiest element if it starts at 00:00:00
    // For better experience "time" in play() method need to be updated before selecting
    // transcription link - this will however exclude link with time: 00:00:00.

    var active = timetable[0];
    active && active.classList.add("active"); // API.

    return {
      play: function play(playTime) {
        var time = playTime;
        active && time !== 0 && active.classList.remove("active");
        timer && clearInterval(timer);
        timer = setInterval(function () {
          time += 1;

          if (timetable[time]) {
            active && active.classList.remove("active");
            active = timetable[time];
            active.classList.add("active");
            content.scrollTop = active.offsetTop;
          }
        }, 1000);
      },
      stop: function stop() {
        timer && clearInterval(timer);
      }
    };
  }

  ;
}
;// CONCATENATED MODULE: ./src/joomla/html/com_videos/item/default/player/player.js









 // Styles.


pistacja_plugin.plugin( /*#__PURE__*/function () {
  var _Player = (0,asyncToGenerator/* default */.Z)( /*#__PURE__*/regenerator_default().mark(function _callee(props) {
    var domain, modals, playerInstance, playlist, activeItem;
    return regenerator_default().wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            domain = props.domain, modals = props.modals; // Manage Tabs.

            TabsManager(990); // Handle USPP Modal.

            usppModal(domain); // Handle player.

            _context.next = 5;
            return YTPlayer("yt-video")["catch"](function () {
              return false;
            });

          case 5:
            playerInstance = _context.sent;
            Transcript(playerInstance); // Handle exercises.

            Exercises(modals); // Coopy links to clipboard.

            dataCopy(); // Perfect scrollbar.

            playlist = document.querySelector("#pie-player-playlist");

            if (playlist) {
              new perfect_scrollbar_esm/* default */.Z(playlist);
              activeItem = playlist.querySelector("li.active");
              activeItem && (playlist.scrollTop = activeItem.offsetTop - 40);
            }

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  function Player(_x) {
    return _Player.apply(this, arguments);
  }

  return Player;
}());

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
/******/ 		__webpack_require__.j = 397;
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
/******/ 			397: 0
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
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, [736], () => (__webpack_require__(77)))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=player.js.map