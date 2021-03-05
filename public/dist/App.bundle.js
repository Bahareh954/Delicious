/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
function autocomplete(input, latInput, lngInput, apiKey) {
    if (!input) return; // skip this function from running if there is not an address input in the page
    var endpoint = "https://map.ir/search/v2/autocomplete";
    $(input).autocomplete({
        source: function source(request, response) {
            $.ajax({
                url: endpoint,
                method: "POST",
                dataType: "json",
                contentType: 'application/json',
                data: JSON.stringify({
                    text: input.value,
                    $filter: 'province eq اصفهان'
                }),
                headers: {
                    'x-api-key': apiKey
                },
                success: function success(data) {
                    response(data.value.map(function (loc) {
                        return {
                            value: loc.address + " | " + loc.title,
                            coordinates: loc.geom.coordinates
                        };
                    }));
                },
                error: function error(_error) {
                    console.error(_error);
                }
            });
        },
        minLength: 2,
        select: function select(event, ui) {
            latInput.value = ui.item.coordinates[1];
            lngInput.value = ui.item.coordinates[0];
        }
    });
}

exports.default = autocomplete;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
// based on https://gist.github.com/paulirish/12fb951a8b893a454b32

var $ = document.querySelector.bind(document);
var $$ = document.querySelectorAll.bind(document);

Node.prototype.on = window.on = function (name, fn) {
  this.addEventListener(name, fn);
};

NodeList.prototype.__proto__ = Array.prototype; // eslint-disable-line

NodeList.prototype.on = NodeList.prototype.addEventListener = function (name, fn) {
  this.forEach(function (elem) {
    elem.on(name, fn);
  });
};

exports.$ = $;
exports.$$ = $$;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
function staticMap(image, apiKey) {
    if (!image) return;

    var url = "https://map.ir/static?width=800&height=150&zoom_level=17&markers=color%3Adefault%7Clabel%3A" + image.dataset.name + "%7C" + image.dataset.lng + "%2C" + image.dataset.lat;
    var loader = "<div class=\"lds-ripple\"><div></div><div></div></div>";
    var loading = $(".loading");
    loading.html(loader);

    function getMap() {
        var response = fetch(url, {
            method: "GET",
            headers: {
                "x-api-key": apiKey
            }
        });
        return response.then(function (data) {
            return data.blob();
        });
    }
    return getMap().then(function (returnedMap) {
        loading.remove();
        image.src = URL.createObjectURL(returnedMap);
    });
}

exports.default = staticMap;

/***/ }),
/* 3 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(3);

var _bling = __webpack_require__(1);

var _autocomplete = __webpack_require__(0);

var _autocomplete2 = _interopRequireDefault(_autocomplete);

var _staticmap = __webpack_require__(2);

var _staticmap2 = _interopRequireDefault(_staticmap);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var apiKey = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImZkYzIwZGI4NTZkNzIwMTRmZTIwYzMzOTYyMWFjOWIzZmE1ODkwZDk2MWFjZWMwNzUzNmJiOWYxY2FhMjlhMTU0ZmQ3MjRhNTA1ZDBlYzU5In0.eyJhdWQiOiIxMjkwOCIsImp0aSI6ImZkYzIwZGI4NTZkNzIwMTRmZTIwYzMzOTYyMWFjOWIzZmE1ODkwZDk2MWFjZWMwNzUzNmJiOWYxY2FhMjlhMTU0ZmQ3MjRhNTA1ZDBlYzU5IiwiaWF0IjoxNjEzOTk3OTU0LCJuYmYiOjE2MTM5OTc5NTQsImV4cCI6MTYxNjQ5OTk1NCwic3ViIjoiIiwic2NvcGVzIjpbImJhc2ljIl19.HXo5W01xOmzdsrGYQ78Sof4h3GEeVnUGXKYNyIS_7Kt9yNCGdDDrTgsFc4eil1nje3z5N1mNHEPsVnbk3ruFjZyw3lo3uhComng_IqnMZPLz6423WTx_9YYHeP86GWTTF9-i58LXlJ8y01iOnsF1MLaihmLJiLMS_4r108JfBfycV83sBTthsghL7hXm3tsTA-aslnTKTwxmufjSWfFHOlNh-NN2S7FJ2fbLdah_cm8ZVd6u0Wy5P3w0EoXkH14KmhRpC7WJQjNPRLzUKPSs9KqgkP4yzIA-eCxQeLa4hQunhhFN22sLPbAiLhog5JHblh6bkK__6D3EDT2V6omGnA";

(0, _autocomplete2.default)((0, _bling.$)("#address"), (0, _bling.$)("#lat"), (0, _bling.$)("#lng"), apiKey);

(0, _staticmap2.default)((0, _bling.$)(".single__map"), apiKey);

/***/ })
/******/ ]);
//# sourceMappingURL=App.bundle.js.map