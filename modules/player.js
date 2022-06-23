/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/joomla/html/com_videos/item/default/player/modules/exercises/analytics.js":
/*!***************************************************************************************!*\
  !*** ./src/joomla/html/com_videos/item/default/player/modules/exercises/analytics.js ***!
  \***************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ analytics)
/* harmony export */ });
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

/***/ }),

/***/ "./src/joomla/html/com_videos/item/default/player/modules/exercises/cleaner.js":
/*!*************************************************************************************!*\
  !*** ./src/joomla/html/com_videos/item/default/player/modules/exercises/cleaner.js ***!
  \*************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ exerciseCleaner)
/* harmony export */ });
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

/***/ }),

/***/ "./src/joomla/html/com_videos/item/default/player/modules/exercises/index.js":
/*!***********************************************************************************!*\
  !*** ./src/joomla/html/com_videos/item/default/player/modules/exercises/index.js ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Exercises)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ "./node_modules/@babel/runtime/helpers/esm/slicedToArray.js");
/* harmony import */ var travrs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! travrs */ "./node_modules/travrs/dist/index.js");
/* harmony import */ var travrs__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(travrs__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! utils */ "./src/modules/utils/index.js");
/* harmony import */ var pistacja_modals__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! pistacja/modals */ "./src/modules/pistacja/modals/index.js");
/* harmony import */ var _analytics__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./analytics */ "./src/joomla/html/com_videos/item/default/player/modules/exercises/analytics.js");
/* harmony import */ var _cleaner__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./cleaner */ "./src/joomla/html/com_videos/item/default/player/modules/exercises/cleaner.js");
/* harmony import */ var _styles_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./styles.scss */ "./src/joomla/html/com_videos/item/default/player/modules/exercises/styles.scss");







function Exercises(modals) {
  var _queryToObject = (0,utils__WEBPACK_IMPORTED_MODULE_2__.queryToObject)(window.location.search),
      exercise = _queryToObject.exercise;

  var modalController = (0,pistacja_modals__WEBPACK_IMPORTED_MODULE_3__.remoteModal)("exercises");
  var model = window.pie_video_exercises;
  delete window.pie_video_exercises; // Initialize Analytics for exercises.

  var tracker = (0,_analytics__WEBPACK_IMPORTED_MODULE_4__["default"])(); // Install Exercise cleaner.

  (0,_cleaner__WEBPACK_IMPORTED_MODULE_5__["default"])(modals); // For Exercises in playlist.

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
  var _template = (0,travrs__WEBPACK_IMPORTED_MODULE_1__.template)("\n    div.pie-player-exercises-modal-container.stack.--medium\n      div.rail.--h-spread.--stretch\n        @header::h2.KGSolid.text-green.font-xl > \"Zadanie\"\n        div.rail.--zero\n          @fullscreen::button.pie-icon-fullscreen-18\n          button.pie-player-exercises-modal-close.pie-icon-close-18[data-pie-modal-close=\"true\"]\n      @video::div.subheader\n      @player::iframe[width=\"100%\" height=\"100%\" scrolling=\"yes\" frameborder=\"0\" allowfullscreen]\n    "),
      _template2 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__["default"])(_template, 2),
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

/***/ }),

/***/ "./src/joomla/html/com_videos/item/default/player/player.js":
/*!******************************************************************!*\
  !*** ./src/joomla/html/com_videos/item/default/player/player.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var pistacja_plugin__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! pistacja/plugin */ "./src/modules/pistacja/plugin/index.js");
/* harmony import */ var data_copy__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! data-copy */ "./src/modules/data-copy/index.js");
/* harmony import */ var tabs_manager__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! tabs-manager */ "./src/modules/tabs-manager/index.js");
/* harmony import */ var _modules_exercises__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/exercises */ "./src/joomla/html/com_videos/item/default/player/modules/exercises/index.js");
/* harmony import */ var pistacja_uspp_modal__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! pistacja/uspp-modal */ "./src/modules/pistacja/uspp-modal/index.js");
/* harmony import */ var perfect_scrollbar__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! perfect-scrollbar */ "./node_modules/perfect-scrollbar/dist/perfect-scrollbar.esm.js");
/* harmony import */ var perfect_scrollbar_css_perfect_scrollbar_css__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! perfect-scrollbar/css/perfect-scrollbar.css */ "./node_modules/perfect-scrollbar/css/perfect-scrollbar.css");




 // import YTPlayer from "./modules/yt-player";


 // import Transcript from "./modules/transcript";

 // Styles.


pistacja_plugin__WEBPACK_IMPORTED_MODULE_2__["default"].plugin( /*#__PURE__*/function () {
  var _Player = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__["default"])( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default().mark(function _callee(props) {
    var domain, modals, mobileBreakpoint, playlist, activeItem, playlistHeader;
    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default().wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            domain = props.domain, modals = props.modals;
            mobileBreakpoint = 990; // Manage Tabs.

            (0,tabs_manager__WEBPACK_IMPORTED_MODULE_4__["default"])(mobileBreakpoint); // Handle USPP Modal.

            (0,pistacja_uspp_modal__WEBPACK_IMPORTED_MODULE_6__["default"])(domain); // Handle player.
            // const playerInstance = await YTPlayer("yt-video");
            // Transcript(playerInstance);
            // Handle exercises.

            (0,_modules_exercises__WEBPACK_IMPORTED_MODULE_5__["default"])(modals); // Coopy links to clipboard.

            (0,data_copy__WEBPACK_IMPORTED_MODULE_3__["default"])(); // Perfect scrollbar.

            playlist = document.querySelector("#pie-player-playlist");
            console.log(playlist);

            if (playlist) {
              new perfect_scrollbar__WEBPACK_IMPORTED_MODULE_7__["default"](playlist);
              activeItem = playlist.querySelector("li.active");

              if (activeItem) {
                playlist.scrollTop = activeItem.offsetTop - 40;
              }
            } // Handle mobil playlist toggle.


            playlistHeader = document.querySelector(".pie-player-playlist");
            playlistHeader.addEventListener("click", function (event) {
              if (window.innerWidth < mobileBreakpoint) {
                playlistHeader.classList.toggle("mobile-playlist-open");
              }
            });

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

/***/ }),

/***/ "./src/joomla/html/com_videos/item/default/player/modules/exercises/styles.scss":
/*!**************************************************************************************!*\
  !*** ./src/joomla/html/com_videos/item/default/player/modules/exercises/styles.scss ***!
  \**************************************************************************************/
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
/******/ 			"./player": 0
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
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["vendor"], () => (__webpack_require__("./src/joomla/html/com_videos/item/default/player/player.js")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;