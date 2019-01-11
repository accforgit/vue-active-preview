module.exports =
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
/******/ 	return __webpack_require__(__webpack_require__.s = "fb15");
/******/ })
/************************************************************************/
/******/ ({

/***/ "0d58":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = __webpack_require__("ce10");
var enumBugKeys = __webpack_require__("e11e");

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};


/***/ }),

/***/ "11e9":
/***/ (function(module, exports, __webpack_require__) {

var pIE = __webpack_require__("52a7");
var createDesc = __webpack_require__("4630");
var toIObject = __webpack_require__("6821");
var toPrimitive = __webpack_require__("6a99");
var has = __webpack_require__("69a8");
var IE8_DOM_DEFINE = __webpack_require__("c69a");
var gOPD = Object.getOwnPropertyDescriptor;

exports.f = __webpack_require__("9e1e") ? gOPD : function getOwnPropertyDescriptor(O, P) {
  O = toIObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return gOPD(O, P);
  } catch (e) { /* empty */ }
  if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);
};


/***/ }),

/***/ "1495":
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__("86cc");
var anObject = __webpack_require__("cb7c");
var getKeys = __webpack_require__("0d58");

module.exports = __webpack_require__("9e1e") ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
  return O;
};


/***/ }),

/***/ "230e":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("d3f4");
var document = __webpack_require__("7726").document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};


/***/ }),

/***/ "2aba":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("7726");
var hide = __webpack_require__("32e9");
var has = __webpack_require__("69a8");
var SRC = __webpack_require__("ca5a")('src');
var TO_STRING = 'toString';
var $toString = Function[TO_STRING];
var TPL = ('' + $toString).split(TO_STRING);

__webpack_require__("8378").inspectSource = function (it) {
  return $toString.call(it);
};

(module.exports = function (O, key, val, safe) {
  var isFunction = typeof val == 'function';
  if (isFunction) has(val, 'name') || hide(val, 'name', key);
  if (O[key] === val) return;
  if (isFunction) has(val, SRC) || hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
  if (O === global) {
    O[key] = val;
  } else if (!safe) {
    delete O[key];
    hide(O, key, val);
  } else if (O[key]) {
    O[key] = val;
  } else {
    hide(O, key, val);
  }
// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, TO_STRING, function toString() {
  return typeof this == 'function' && this[SRC] || $toString.call(this);
});


/***/ }),

/***/ "2aeb":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = __webpack_require__("cb7c");
var dPs = __webpack_require__("1495");
var enumBugKeys = __webpack_require__("e11e");
var IE_PROTO = __webpack_require__("613b")('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__("230e")('iframe');
  var i = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__("fab2").appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty();
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};


/***/ }),

/***/ "2d00":
/***/ (function(module, exports) {

module.exports = false;


/***/ }),

/***/ "2d95":
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),

/***/ "32e9":
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__("86cc");
var createDesc = __webpack_require__("4630");
module.exports = __webpack_require__("9e1e") ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),

/***/ "4588":
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};


/***/ }),

/***/ "4630":
/***/ (function(module, exports) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),

/***/ "50ca":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "52a7":
/***/ (function(module, exports) {

exports.f = {}.propertyIsEnumerable;


/***/ }),

/***/ "5537":
/***/ (function(module, exports, __webpack_require__) {

var core = __webpack_require__("8378");
var global = __webpack_require__("7726");
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: core.version,
  mode: __webpack_require__("2d00") ? 'pure' : 'global',
  copyright: '© 2018 Denis Pushkarev (zloirock.ru)'
});


/***/ }),

/***/ "5ca1":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("7726");
var core = __webpack_require__("8378");
var hide = __webpack_require__("32e9");
var redefine = __webpack_require__("2aba");
var ctx = __webpack_require__("9b43");
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] || (global[name] = {}) : (global[name] || {})[PROTOTYPE];
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE] || (exports[PROTOTYPE] = {});
  var key, own, out, exp;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    // export native or passed
    out = (own ? target : source)[key];
    // bind timers to global for call from export context
    exp = IS_BIND && own ? ctx(out, global) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // extend global
    if (target) redefine(target, key, out, type & $export.U);
    // export
    if (exports[key] != out) hide(exports, key, exp);
    if (IS_PROTO && expProto[key] != out) expProto[key] = out;
  }
};
global.core = core;
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;


/***/ }),

/***/ "5dbc":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("d3f4");
var setPrototypeOf = __webpack_require__("8b97").set;
module.exports = function (that, target, C) {
  var S = target.constructor;
  var P;
  if (S !== C && typeof S == 'function' && (P = S.prototype) !== C.prototype && isObject(P) && setPrototypeOf) {
    setPrototypeOf(that, P);
  } return that;
};


/***/ }),

/***/ "613b":
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__("5537")('keys');
var uid = __webpack_require__("ca5a");
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};


/***/ }),

/***/ "626a":
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__("2d95");
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};


/***/ }),

/***/ "6321":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_preview_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("50ca");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_preview_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_preview_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_preview_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "6821":
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__("626a");
var defined = __webpack_require__("be13");
module.exports = function (it) {
  return IObject(defined(it));
};


/***/ }),

/***/ "69a8":
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),

/***/ "6a99":
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__("d3f4");
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),

/***/ "7726":
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


/***/ }),

/***/ "77f1":
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__("4588");
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};


/***/ }),

/***/ "79e5":
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};


/***/ }),

/***/ "7f7f":
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__("86cc").f;
var FProto = Function.prototype;
var nameRE = /^\s*function ([^ (]*)/;
var NAME = 'name';

// 19.2.4.2 name
NAME in FProto || __webpack_require__("9e1e") && dP(FProto, NAME, {
  configurable: true,
  get: function () {
    try {
      return ('' + this).match(nameRE)[1];
    } catch (e) {
      return '';
    }
  }
});


/***/ }),

/***/ "8378":
/***/ (function(module, exports) {

var core = module.exports = { version: '2.6.1' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),

/***/ "86cc":
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__("cb7c");
var IE8_DOM_DEFINE = __webpack_require__("c69a");
var toPrimitive = __webpack_require__("6a99");
var dP = Object.defineProperty;

exports.f = __webpack_require__("9e1e") ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),

/***/ "8b97":
/***/ (function(module, exports, __webpack_require__) {

// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
var isObject = __webpack_require__("d3f4");
var anObject = __webpack_require__("cb7c");
var check = function (O, proto) {
  anObject(O);
  if (!isObject(proto) && proto !== null) throw TypeError(proto + ": can't set as prototype!");
};
module.exports = {
  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
    function (test, buggy, set) {
      try {
        set = __webpack_require__("9b43")(Function.call, __webpack_require__("11e9").f(Object.prototype, '__proto__').set, 2);
        set(test, []);
        buggy = !(test instanceof Array);
      } catch (e) { buggy = true; }
      return function setPrototypeOf(O, proto) {
        check(O, proto);
        if (buggy) O.__proto__ = proto;
        else set(O, proto);
        return O;
      };
    }({}, false) : undefined),
  check: check
};


/***/ }),

/***/ "9093":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys = __webpack_require__("ce10");
var hiddenKeys = __webpack_require__("e11e").concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return $keys(O, hiddenKeys);
};


/***/ }),

/***/ "9b43":
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__("d8e8");
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),

/***/ "9def":
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__("4588");
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};


/***/ }),

/***/ "9e1e":
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__("79e5")(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),

/***/ "aa77":
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__("5ca1");
var defined = __webpack_require__("be13");
var fails = __webpack_require__("79e5");
var spaces = __webpack_require__("fdef");
var space = '[' + spaces + ']';
var non = '\u200b\u0085';
var ltrim = RegExp('^' + space + space + '*');
var rtrim = RegExp(space + space + '*$');

var exporter = function (KEY, exec, ALIAS) {
  var exp = {};
  var FORCE = fails(function () {
    return !!spaces[KEY]() || non[KEY]() != non;
  });
  var fn = exp[KEY] = FORCE ? exec(trim) : spaces[KEY];
  if (ALIAS) exp[ALIAS] = fn;
  $export($export.P + $export.F * FORCE, 'String', exp);
};

// 1 -> String#trimLeft
// 2 -> String#trimRight
// 3 -> String#trim
var trim = exporter.trim = function (string, TYPE) {
  string = String(defined(string));
  if (TYPE & 1) string = string.replace(ltrim, '');
  if (TYPE & 2) string = string.replace(rtrim, '');
  return string;
};

module.exports = exporter;


/***/ }),

/***/ "be13":
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};


/***/ }),

/***/ "c366":
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__("6821");
var toLength = __webpack_require__("9def");
var toAbsoluteIndex = __webpack_require__("77f1");
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};


/***/ }),

/***/ "c5f6":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__("7726");
var has = __webpack_require__("69a8");
var cof = __webpack_require__("2d95");
var inheritIfRequired = __webpack_require__("5dbc");
var toPrimitive = __webpack_require__("6a99");
var fails = __webpack_require__("79e5");
var gOPN = __webpack_require__("9093").f;
var gOPD = __webpack_require__("11e9").f;
var dP = __webpack_require__("86cc").f;
var $trim = __webpack_require__("aa77").trim;
var NUMBER = 'Number';
var $Number = global[NUMBER];
var Base = $Number;
var proto = $Number.prototype;
// Opera ~12 has broken Object#toString
var BROKEN_COF = cof(__webpack_require__("2aeb")(proto)) == NUMBER;
var TRIM = 'trim' in String.prototype;

// 7.1.3 ToNumber(argument)
var toNumber = function (argument) {
  var it = toPrimitive(argument, false);
  if (typeof it == 'string' && it.length > 2) {
    it = TRIM ? it.trim() : $trim(it, 3);
    var first = it.charCodeAt(0);
    var third, radix, maxCode;
    if (first === 43 || first === 45) {
      third = it.charCodeAt(2);
      if (third === 88 || third === 120) return NaN; // Number('+0x1') should be NaN, old V8 fix
    } else if (first === 48) {
      switch (it.charCodeAt(1)) {
        case 66: case 98: radix = 2; maxCode = 49; break; // fast equal /^0b[01]+$/i
        case 79: case 111: radix = 8; maxCode = 55; break; // fast equal /^0o[0-7]+$/i
        default: return +it;
      }
      for (var digits = it.slice(2), i = 0, l = digits.length, code; i < l; i++) {
        code = digits.charCodeAt(i);
        // parseInt parses a string to a first unavailable symbol
        // but ToNumber should return NaN if a string contains unavailable symbols
        if (code < 48 || code > maxCode) return NaN;
      } return parseInt(digits, radix);
    }
  } return +it;
};

if (!$Number(' 0o1') || !$Number('0b1') || $Number('+0x1')) {
  $Number = function Number(value) {
    var it = arguments.length < 1 ? 0 : value;
    var that = this;
    return that instanceof $Number
      // check on 1..constructor(foo) case
      && (BROKEN_COF ? fails(function () { proto.valueOf.call(that); }) : cof(that) != NUMBER)
        ? inheritIfRequired(new Base(toNumber(it)), that, $Number) : toNumber(it);
  };
  for (var keys = __webpack_require__("9e1e") ? gOPN(Base) : (
    // ES3:
    'MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,' +
    // ES6 (in case, if modules with ES6 Number statics required before):
    'EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,' +
    'MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger'
  ).split(','), j = 0, key; keys.length > j; j++) {
    if (has(Base, key = keys[j]) && !has($Number, key)) {
      dP($Number, key, gOPD(Base, key));
    }
  }
  $Number.prototype = proto;
  proto.constructor = $Number;
  __webpack_require__("2aba")(global, NUMBER, $Number);
}


/***/ }),

/***/ "c69a":
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__("9e1e") && !__webpack_require__("79e5")(function () {
  return Object.defineProperty(__webpack_require__("230e")('div'), 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),

/***/ "ca5a":
/***/ (function(module, exports) {

var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};


/***/ }),

/***/ "cb7c":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("d3f4");
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};


/***/ }),

/***/ "ce10":
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__("69a8");
var toIObject = __webpack_require__("6821");
var arrayIndexOf = __webpack_require__("c366")(false);
var IE_PROTO = __webpack_require__("613b")('IE_PROTO');

module.exports = function (object, names) {
  var O = toIObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};


/***/ }),

/***/ "d3f4":
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),

/***/ "d8e8":
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};


/***/ }),

/***/ "e11e":
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');


/***/ }),

/***/ "fab2":
/***/ (function(module, exports, __webpack_require__) {

var document = __webpack_require__("7726").document;
module.exports = document && document.documentElement;


/***/ }),

/***/ "fb15":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/@vue/cli-service/lib/commands/build/setPublicPath.js
// This file is imported into lib/wc client bundles.

if (typeof window !== 'undefined') {
  var i
  if ((i = window.document.currentScript) && (i = i.src.match(/(.+\/)[^/]+\.js(\?.*)?$/))) {
    __webpack_require__.p = i[1] // eslint-disable-line
  }
}

// Indicate to webpack that this file can be concatenated
/* harmony default export */ var setPublicPath = (null);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.function.name.js
var es6_function_name = __webpack_require__("7f7f");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules//.cache//vue-loader","cacheIdentifier":"325c1899-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/preview.vue?vue&type=template&id=eed85a5a&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('transition',{attrs:{"name":"preview-fade","appear":""}},[_c('div',{staticClass:"active-preview",on:{"click":function($event){_vm.previewClick(_vm.activeIndex)}}},[(_vm.showCounter && _vm.previewItemCount > 1)?_c('span',{staticClass:"preview-counter",style:(_vm.counterStyle)},[_vm._v(_vm._s(_vm.activeIndex)+" / "+_vm._s(_vm.previewItemCount - 2))]):_vm._e(),_c('div',{ref:"previewWrapper",staticClass:"preview-wrapper",style:({
        transform: ("translate3d(" + _vm.transX + "px, 0, 0)"),
        transition: _vm.isTransToX ? ("transform " + _vm.duration + "ms ease-out") : ''
      }),on:{"touchstart":_vm.touchstartFn,"touchmove":_vm.touchmoveFn,"touchend":_vm.touchendFn,"transitionend":_vm.transitionEndFn}},_vm._l((_vm.currentList),function(item,index){return _c('div',{key:item._id,staticClass:"preview-box"},[_c('div',{staticClass:"preview-item",style:({
          left: (index === _vm.activeIndex ? _vm.left : '0') + 'px',
          top: (index === _vm.activeIndex ? _vm.top : '0') + 'px',
          width: index === _vm.activeIndex ? (_vm.currentW + 'px') : '100%',
          height: index === _vm.activeIndex ? (_vm.currentH + 'px') : '100%',
          transform: index === _vm.activeIndex ? ("translate3d(" + _vm.doubleSingleTransLeft + "px, " + _vm.doubleSingleTransTop + "px, 0) scale(" + _vm.scaleValue + ")") : '',
          transformOrigin: (_vm.transOriginX + "px " + _vm.transOriginY + "px"),
          backgroundImage: ("url(" + (item.url) + ")"),
          backgroundSize: _vm.backgroundSize,
          transition: _vm.isDoubleTapScaling && index === _vm.activeIndex ? 'all 0.16s ease-out' : ''
        })})])}),0),_vm._t("default")],2)])}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/preview.vue?vue&type=template&id=eed85a5a&

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.number.constructor.js
var es6_number_constructor = __webpack_require__("c5f6");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/preview.vue?vue&type=script&lang=js&

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
// 屏幕宽度
var clientW = document.documentElement.clientWidth;
var clientH = document.documentElement.clientHeight; // 1：单指滑动；2：双指缩放，3：双指缩放后进行单指滑动查看缩放后的图片

var figureType = 0; // 单指操作 - 滑动坐标相关，即 figureType = 1
// touchStart 点击坐标

var singleStartX = 0; // 上个周期中的tranlateX 坐标

var singlePrevX = 0; // 当前是否需要自动滑动到下一张图片

var singleAutoNext = false; // 滑动的方向，true为右滑，false为左滑

var singleDirectionFlag = false; // 双指缩放操作 - 滑动坐标相关，即 figureType = 2
// 缩放起始双指间的间距

var doubleStartDistance = 0; // 最大放大倍数

var doubleStartMaxScaleWidth = 0; // 双指缩放后进行单指滑动查看缩放后的图片 ，即 figureType = 3

var doubleSingleStartX = 0;
var doubleSingleStartY = 0;
var doubleSinglePrevX = 0;
var doubleSinglePrevY = 0;
var doubleSingleLastClientX = 0;
var doubleSingleLastClientY = 0;
var doubleSingleSpeedX = 0;
var doubleSingleSpeedY = 0;
var doubleSingleExceedBoundary = false; // 用于辅助判断是否是双击/单击/长按事件

var eventTimeStamp = 0;
var eventStartX = 0;
var eventStartY = 0;
var eventIsDoubleTap = 0; // 当前正在预览的图片次序，用于位置计算

var activeIndex = 0;
var criticalWidth = 0; // 用于取消自动轮播（如果指定了的话）

var autoPlayTimer = null; // previewWrapper上的触摸点数量

var touchCount = 0; // 兼容性相关

var raf = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function (callback) {
  setTimeout(callback, 1000 / 60);
};

var cancelRaf = window.cancelAnimationFrame || window.webkitCancelAnimationFrame || window.mozCancelAnimationFrame || function (handler) {
  clearTimeout(handler);
};

var rafHandler = null;
var isSupportGetBoundingClientRect = typeof document.documentElement.getBoundingClientRect === 'function';
/* harmony default export */ var previewvue_type_script_lang_js_ = ({
  name: 'VueActivePreview',
  props: {
    urlList: {
      type: Array,
      required: true,
      default: function _default() {
        return [];
      }
    },
    // 图片以何种缩放的形式铺在 滑动容器框内
    backgroundSize: {
      type: String,
      required: false,
      default: 'contain'
    },
    maxScaleValue: {
      type: Number,
      required: false,
      // 最大放大倍数，默认为5，最小为 1，如果为0，则表示不进行放大倍数的限制
      default: 5,
      validator: function validator(value) {
        return value === 0 || value >= 1;
      }
    },
    // 是否需要默认的计数器
    showCounter: {
      type: Boolean,
      required: false,
      default: true
    },
    // 自定义默认计数器的样式 
    counterStyle: {
      type: Object,
      required: false,
      default: null
    },
    // 单指操作 - 起始index
    startIndex: {
      type: Number,
      required: false,
      default: 0
    },
    // 单指操作 - 临界点的比例值，当超过这个临界点，则需要自动滑动到下一张图片
    criticalValue: {
      type: Number,
      required: false,
      default: 1 / 3
    },
    // 单指操作 - 自动滚动到固定位置所需的时间，单位是秒(ms)
    duration: {
      type: Number,
      required: false,
      default: 350,
      validator: function validator(value) {
        return value === 0 || value >= 0;
      }
    },
    // 如果指定了此参数，并且值 >= 0，则将会将此值当做 delay的时间(单位为 ms)进行自动轮播；
    // 不指定或指定值小于 0 则不自动轮播
    // 如果想要指定此值，一般建议设置为 3000
    autoPlayDelay: {
      type: Number,
      required: false,
      default: null
    },
    // 如果只有一个 swipe-item，则不允许拖动
    noDragWhenSingle: {
      type: Boolean,
      required: false,
      default: true
    }
  },
  data: function data() {
    return {
      // 当前显示在DOM中的图片列表
      currentList: [],
      // 单指滑动的位移
      transX: 0,
      // 当前正在预览的图片次序
      activeIndex: 0,
      // 双指操作相关，双指缩放的比例
      scaleValue: 1,
      // 双指操作相关，缩放变换的基点
      transOriginX: '0',
      transOriginY: '0',
      // 双指操作相关，当前被缩放的图片的即时宽高
      currentW: clientW,
      currentH: clientH,
      // 双指操作相关，当前被缩放的图片的即时定位
      top: 0,
      left: 0,
      // 双指缩放后进行单指滑动查看缩放后的图片的定位
      doubleSingleTransLeft: 0,
      doubleSingleTransTop: 0,
      // 是否在双击缩放过程中
      isDoubleTapScaling: false,
      // 正在自动滚动到固定位置的过程中
      isTransToX: false,
      previewItemCount: 0
    };
  },
  created: function created() {
    var _this = this;

    this.currentList = this.urlList.length > 1 ? this.urlList.slice(-1).concat(this.urlList, this.urlList.slice(0, 1)).map(function (url, index) {
      return {
        url: url,
        _id: index
      };
    }) : this.urlList.map(function (url, index) {
      return {
        url: url,
        _id: index
      };
    });
    this.previewItemCount = this.currentList.length;
    criticalWidth = clientW * this.criticalValue;

    if (this.previewItemCount > 1) {
      // 因为首尾都多加了一个previewItem元素，所以顺延一位
      this.activeIndex = activeIndex = this.getActiveIndex(this.startIndex + 1);
      singlePrevX = -clientW * activeIndex;
      this.transX = -clientW * activeIndex;
    }

    if (typeof this.maxScaleValue === 'number') {
      doubleStartMaxScaleWidth = clientW * this.maxScaleValue;
    }

    autoPlayTimer = setTimeout(function () {
      _this.autoPlayFn();
    }, 14);
  },
  destroy: function destroy() {
    clearTimeout(autoPlayTimer);
  },
  methods: {
    touchstartFn: function touchstartFn(e) {
      touchCount = e.touches.length;
      if (this.isDoubleTapScaling) return; // 取消自动轮播事件

      clearTimeout(autoPlayTimer); // 稳定下来后，应该的偏移位置

      var fixedTransX = -clientW * activeIndex;

      if (this.isTransToX) {
        if (isSupportGetBoundingClientRect) {
          var rect = this.$refs.previewWrapper.getBoundingClientRect();
          this.isTransToX = false;
          this.transX = singlePrevX = rect.left;
        } else {
          figureType = 0;
          return;
        }
      }

      var touch0 = e.touches[0];

      if (touchCount === 1) {
        if (this.currentW === clientW || doubleSingleExceedBoundary) {
          if (this.transX === fixedTransX && this.isDoubleTap(e)) {
            // 双击放大 -> 双指缩放
            figureType = 2;
            this.doubleTapAction(touch0, true);
          } else {
            figureType = 1;
            this.singleTouchStartFn(e);
          }
        } else if (this.currentW > clientW && this.transX === fixedTransX) {
          if (this.isDoubleTap(e)) {
            // 双击恢复 -> 双指缩放
            figureType = 0;
            this.doubleTapAction(touch0, false);
          } else {
            // 双指缩放操作过程中，单指滑动查看放大后的图片
            figureType = 3;
            this.doubleSingleTouchStartFn(e);
          }
        } // 用于判断 单击、双击、长按事件


        eventTimeStamp = e.timeStamp;
        eventStartX = touch0.clientX;
        eventStartY = touch0.clientY;
      } else if (touchCount === 2) {
        if (this.transX === fixedTransX) {
          figureType = 2; // 双指缩放

          this.doubleTouchStartFn(e);
        }
      }
    },
    touchmoveFn: function touchmoveFn(e) {
      e.preventDefault();
      if (this.isDoubleTapScaling) return;
      var len = e.touches.length;

      if (figureType === 1 && len === 1) {
        this.singleTouchMoveFn(e);
      } else if (figureType === 2 && len === 2) {
        this.doubleTouchMoveFn(e);
      } else if (figureType === 3 && len === 1) {
        this.doubleSingleTouchMoveFn(e);
      }
    },
    touchendFn: function touchendFn(e) {
      var touches = e.touches;
      touchCount = touches.length;

      if (this.isDoubleTapScaling) {
        if (this.currentW === clientW) {
          // 缩小到正常大小，重启轮播（如果指定了的话）
          this.autoPlayFn();
        }

        return;
      } // 手机触摸数量超过 2，则忽略


      if (touchCount > 2) return;

      if (touchCount === 2) {
        if (this.transX === -clientW * activeIndex) {
          figureType = 2;
          this.doubleTouchStartFn(e);
        }

        return;
      }

      if (eventIsDoubleTap) {
        // 重置
        eventIsDoubleTap = false;
        eventStartX = -1;
        eventStartY = -1;
        eventTimeStamp = 0;
      }

      if (figureType === 1) {
        if (touchCount === 0) {
          this.singleTouchEndFn();
        }
      } else if (figureType === 2) {
        if (this.scaleValue !== 1) {
          this.doubleTouchEndFn();
        }
      } else if (figureType === 3) {
        this.doubleSingleTouchEndFn(e);
      } // 更新状态


      if (touchCount === 1) {
        if (figureType !== 0) {
          singleStartX = doubleSingleStartX = touches[0].clientX;
          singlePrevX = this.transX;
          doubleSingleStartY = touches[0].clientY;
          doubleSinglePrevX = this.doubleSingleTransLeft;
          doubleSinglePrevY = this.doubleSingleTransTop;

          if (this.transX === -clientW * activeIndex) {
            if (this.currentW !== clientW) {
              figureType = 2;
            } else {
              figureType = 1;
            }
          } else {
            figureType = 1;
          }
        }
      } else {
        figureType = 0;
      }
    },
    // 单指滑动行为 - start
    singleTouchStartFn: function singleTouchStartFn(e) {
      if (this.ignoreTouch()) return; // 取消还没结束的自动轮播（如果指定了轮播的话）

      clearTimeout(autoPlayTimer);
      singleStartX = e.touches[0].clientX;
    },
    // 单指滑动行为 - move
    singleTouchMoveFn: function singleTouchMoveFn(e) {
      if (this.ignoreTouch()) return;

      if (this.previewItemCount !== 1) {
        var transX = e.touches[0].clientX - singleStartX + singlePrevX;

        if (transX > 0) {
          // 滑动到到第一个了
          singleStartX = e.touches[0].clientX; // 矫正到正确位置

          singlePrevX = transX = -clientW * (this.previewItemCount - 2);
        } else if (transX < -clientW * (this.previewItemCount - 1)) {
          // 滑动到最后一个了
          singleStartX = e.touches[0].clientX; // 矫正到正确位置

          singlePrevX = transX = -clientW;
        }

        this.transX = transX;
      } else {
        // 数量为1
        if (!this.noDragWhenSingle) {
          // 允许拖动
          this.transX = (e.touches[0].clientX - singleStartX) * 0.1 + singlePrevX;
        }
      }
    },
    // 单指滑动行为 - end
    singleTouchEndFn: function singleTouchEndFn() {
      if (this.ignoreTouch()) return;

      if (this.previewItemCount !== 1 || !this.noDragWhenSingle) {
        var toX = this.previewItemCount === 1 ? 0 : this.getSingleTouchEndMultipleChildToX();

        if (this.transX === toX) {
          // 已经手动滑到正确的位置
          this.transEndFn();
        } else {
          // 自由滚动到合适的位置
          this.isTransToX = true;
          this.transX = toX;
          this.correctDurationAct();
        }
      }
    },
    // 单指滑动行为 - end，preview-item数量大于 1 的情况
    getSingleTouchEndMultipleChildToX: function getSingleTouchEndMultipleChildToX() {
      var toX = 0;
      var diffX = this.transX + clientW * activeIndex;
      var wholeBlock = Math.floor(diffX / clientW); // 如果连续滑过超过一个 previewItem 块

      if (Math.abs(diffX) > clientW) {
        activeIndex = Math.ceil(-this.transX / clientW);
        diffX = diffX - clientW * wholeBlock;
      } // diffX 大于0 说明是右滑，小于0 则是左滑


      if (diffX > 0) {
        singleDirectionFlag = -1;
        singleAutoNext = diffX > criticalWidth;
        toX = singleAutoNext ? -clientW * (activeIndex - 1) : -clientW * activeIndex;
      } else if (diffX < 0) {
        singleDirectionFlag = 1;
        singleAutoNext = Math.abs(diffX) > criticalWidth;
        toX = singleAutoNext ? -clientW * (activeIndex + 1) : -clientW * activeIndex;
      } else {
        singleDirectionFlag = 0;
        singleAutoNext = false;
        toX = -clientW * activeIndex;
      }

      return toX;
    },
    transEndFn: function transEndFn() {
      var _this2 = this;

      var currentActiveIndex = this.getActiveIndex(activeIndex + (singleAutoNext ? singleDirectionFlag : 0));
      this.transX = singlePrevX = -clientW * currentActiveIndex; // 双指放大后的单指滑动行为

      if (doubleSingleExceedBoundary) {
        doubleSingleExceedBoundary = false;

        if (currentActiveIndex !== activeIndex) {
          this.left = 0;
          this.top = 0;
          this.currentW = clientW;
          this.currentH = clientH;
        }
      }

      this.activeIndex = activeIndex = currentActiveIndex; // 单指操作 - 每次滚动结束后的回调

      this.$emit('change', this.activeIndex); // setTimeout是为了避免当 autoPlayDelay值被指定为 0 时无限轮播出现问题
      // 16.7 是 1000/60 的大约值

      setTimeout(function () {
        _this2.autoPlayFn();
      }, 16.7);
    },
    // 双指缩放行为 - start
    doubleTouchStartFn: function doubleTouchStartFn(e) {
      var targetTouch1 = e.touches[0];
      var targetTouch2 = e.touches[1]; // 两指之间的中心点坐标，当做一个标准对齐坐标

      this.transOriginX = (targetTouch1.clientX + targetTouch2.clientX) / 2 - this.left;
      this.transOriginY = (targetTouch1.clientY + targetTouch2.clientY) / 2 - this.top; // 获取开始时两指间距离

      doubleStartDistance = this.getDistance(targetTouch1, targetTouch2);
    },
    // 双指缩放行为 - move
    doubleTouchMoveFn: function doubleTouchMoveFn(e) {
      // 得到本次两指间的距离和上次两指间的距离比例，即为缩放比例
      this.scaleValue = this.getDistance(e.touches[0], e.touches[1]) / doubleStartDistance;
    },
    // 双指缩放行为 - end
    doubleTouchEndFn: function doubleTouchEndFn() {
      var scaleValue = this.scaleValue; // 缩放比例没有改变，无需更新状态

      if (scaleValue === 1) return;
      var currentW = scaleValue * this.currentW;
      var currentH = 0; // 超出最大放大倍数了，需回退到最大倍数的状态

      if (doubleStartMaxScaleWidth !== 0 && currentW > doubleStartMaxScaleWidth) {
        currentW = doubleStartMaxScaleWidth; // 重新计算本次 scaleValue

        scaleValue = currentW / this.currentW;
      } // 如果缩放比例小于1，则恢复到1


      if (currentW < clientW) {
        currentW = clientW; // 重新计算本次 scaleValue

        scaleValue = currentW / this.currentW;
      }

      currentH = scaleValue * this.currentH;
      var left = -(scaleValue - 1) * this.transOriginX + this.left;
      var top = -(scaleValue - 1) * this.transOriginY + this.top; // 缩放后的图片没有完全占据屏幕，则补全空白屏幕空间

      if (left < 0) {
        if (Math.abs(left) + clientW > currentW) {
          left = clientW - currentW;
        }
      } else {
        left = 0;
      }

      if (top < 0) {
        if (Math.abs(top) + clientH > currentH) {
          top = clientH - currentH;
        }
      } else {
        top = 0;
      } // 更新当前状态


      this.left = left;
      this.top = top;
      this.currentW = currentW;
      this.currentH = currentH;
      this.scaleValue = 1;
    },
    // 双指缩放后，单指滑动查看大图行为 - start
    doubleSingleTouchStartFn: function doubleSingleTouchStartFn(e) {
      // 如果有自动滚动未停止则将其取消掉
      if (rafHandler) {
        cancelRaf(rafHandler);
        rafHandler = null;
        this.fixedDoubleSingleStatus();
      }

      doubleSingleStartX = e.touches[0].clientX;
      doubleSingleStartY = e.touches[0].clientY;
    },
    // 双指缩放后，单指滑动查看大图行为 - move
    doubleSingleTouchMoveFn: function doubleSingleTouchMoveFn(e) {
      var touch = e.touches[0];
      doubleSingleSpeedX = touch.clientX - doubleSingleLastClientX;
      doubleSingleSpeedY = touch.clientY - doubleSingleLastClientY;
      doubleSingleLastClientX = touch.clientX;
      doubleSingleLastClientY = touch.clientY;
      var transX = doubleSingleLastClientX - doubleSingleStartX + doubleSinglePrevX;
      var transY = doubleSingleLastClientY - doubleSingleStartY + doubleSinglePrevY; // 滚动到边界的情况

      if (transX > 0) {
        if (transX + this.left > 0) {
          // 左越界
          if (this.left === 0) {
            doubleSingleExceedBoundary = true;
            doubleSingleLastClientX = doubleSingleLastClientY = 0;
            this.top = this.getLimitVerticalBoundaryTop(transY);
            singleStartX = e.touches[0].clientX;
            figureType = 1;
            transX = transY = 0;
          } else {
            transX = -this.left;
          }
        }
      } else if (transX < 0) {
        var maxLeft = clientW - this.currentW;

        if (transX + this.left < maxLeft) {
          // 右越界
          if (this.left === maxLeft) {
            doubleSingleExceedBoundary = true;
            doubleSingleLastClientX = doubleSingleLastClientY = 0;
            this.top = this.getLimitVerticalBoundaryTop(transY);
            singleStartX = e.touches[0].clientX;
            figureType = 1;
            transX = transY = 0;
          } else {
            transX = maxLeft - this.left;
          }
        }
      }

      if (transY > 0) {
        // 上边界
        if (transY + this.top > 0) {
          // 不允许越界
          this.top = transY = 0;
        }
      } else if (transY < 0) {
        // 下边界
        if (transY + this.top < clientH - this.currentH) {
          this.top = clientH - this.currentH;
          transY = 0;
        }
      }

      this.doubleSingleTransLeft = transX;
      this.doubleSingleTransTop = transY;
    },
    // 双指缩放后，单指滑动查看大图行为 - end
    doubleSingleTouchEndFn: function doubleSingleTouchEndFn() {
      if (doubleSingleLastClientX) {
        doubleSingleLastClientX = doubleSingleLastClientY = 0; // 惯性滚动

        this.frictionMove(doubleSingleSpeedX, doubleSingleSpeedY);
      } else {
        this.fixedDoubleSingleStatus();
      }
    },
    // 左、右越界时，上下边界的处理
    getLimitVerticalBoundaryTop: function getLimitVerticalBoundaryTop(transY) {
      var nextTop = transY + this.top;

      if (nextTop > 0) {
        nextTop = 0;
      } else if (nextTop < clientH - this.currentH) {
        nextTop = clientH - this.currentH;
      }

      return nextTop;
    },
    frictionMove: function frictionMove(speedX, speedY) {
      var _this3 = this;

      var doubleSingleTransLeft = null;
      var doubleSingleTransTop = null;
      rafHandler = raf(function () {
        speedX *= 0.9;
        speedY *= 0.9;
        doubleSingleTransLeft = _this3.doubleSingleTransLeft + speedX;
        doubleSingleTransTop = _this3.doubleSingleTransTop + speedY;

        if (doubleSingleTransLeft + _this3.left > 0) {
          doubleSingleTransLeft = -_this3.left;
          speedX = 0;
        } else if (clientW - _this3.currentW > doubleSingleTransLeft + _this3.left) {
          doubleSingleTransLeft = clientW - _this3.currentW - _this3.left;
          speedX = 0;
        }

        if (doubleSingleTransTop + _this3.top > 0) {
          // 上边界越界
          doubleSingleTransTop = -_this3.top;
          speedY = 0;
        } else if (clientH - _this3.currentH > doubleSingleTransTop + _this3.top) {
          // 下边界越界
          doubleSingleTransTop = clientH - _this3.currentH - _this3.top;
          speedY = 0;
        }

        _this3.doubleSingleTransLeft = doubleSingleTransLeft;
        _this3.doubleSingleTransTop = doubleSingleTransTop;
        if (Math.abs(speedX) < 1) speedX = 0;
        if (Math.abs(speedY) < 1) speedY = 0;

        if (speedX !== 0 || speedY !== 0) {
          _this3.frictionMove(speedX, speedY);
        } else {
          _this3.fixedDoubleSingleStatus();
        }
      });
    },
    fixedDoubleSingleStatus: function fixedDoubleSingleStatus() {
      var doubleSingleTransLeft = this.doubleSingleTransLeft;
      var doubleSingleTransTop = this.doubleSingleTransTop;
      this.left = doubleSingleTransLeft + this.left;
      this.top = doubleSingleTransTop + this.top;
      this.doubleSingleTransLeft = this.doubleSingleTransTop = 0;
      doubleSinglePrevX = doubleSinglePrevY = 0;
      doubleSingleLastClientX = doubleSingleLastClientY = 0;
    },
    // 是否是双击行为
    isDoubleTap: function isDoubleTap(e) {
      eventIsDoubleTap = e.timeStamp - eventTimeStamp <= 250 && Math.abs(e.touches[0].clientX - eventStartX) < 30 && Math.abs(e.touches[0].clientY - eventStartY) < 30;
      return eventIsDoubleTap;
    },
    // 双击放大/恢复状态，enlarge：是否是放大操作
    doubleTapAction: function doubleTapAction(touch, isEnlarge) {
      // 正在滑动中则忽略双击缩放
      if (this.transX !== -clientW * activeIndex) return;
      if (this.isTransToX) return;
      this.isDoubleTapScaling = true;

      if (isEnlarge) {
        // 需要放大
        this.transOriginX = touch.clientX;
        this.transOriginY = touch.clientY;
        this.scaleValue = 2;
        this.doubleTouchEndFn();
      } else {
        // 需要缩小恢复到原始状态
        this.left = 0;
        this.top = 0;
        this.currentW = clientW;
        this.currentH = clientH;
      }
    },
    getActiveIndex: function getActiveIndex(index) {
      if (this.previewItemCount === 1) return 0;
      if (index >= this.previewItemCount - 1) return 1;
      if (index <= 0) return this.previewItemCount - 2;
      return index;
    },
    // 获取两指点间的距离长度
    getDistance: function getDistance(p1, p2) {
      return Math.sqrt(Math.pow(p2.clientX - p1.clientX, 2) + Math.pow(p2.clientY - p1.clientY, 2));
    },
    transitionEndFn: function transitionEndFn(e) {
      var targetClassName = e.target.className;

      if (targetClassName === 'preview-wrapper') {
        // 单指滑动
        if (this.isTransToX) {
          // 单指操作 - 自动滑动结束
          this.isTransToX = false;
          this.transEndFn();
        }
      } else if (targetClassName === 'preview-item') {
        // 缩放
        this.isDoubleTapScaling = false;
      }
    },
    autoPlayFn: function autoPlayFn() {
      var _this4 = this;

      // 判断是否满足自动轮播的条件
      if (this.previewItemCount > 1 && typeof this.autoPlayDelay === 'number' && this.autoPlayDelay >= 0 && touchCount === 0 && this.transX % clientW === 0 && this.currentW === clientW) {
        clearTimeout(autoPlayTimer);
        autoPlayTimer = setTimeout(function () {
          activeIndex = activeIndex + 1;
          _this4.transX = -clientW * activeIndex;
          _this4.isTransToX = true;

          _this4.correctDurationAct(); // 校正


          singleAutoNext = false;
        }, this.autoPlayDelay);
      }
    },
    // 整个组件的点击事件，可用于控制整个组件的显示/隐藏
    previewClick: function previewClick() {
      this.$emit('click', this.activeIndex - 1);
    },
    // 如果没有传入 preview-item子元素，或者只传入了一个子元素并且 noDragWhenSingle为 true，
    // 则不对 touch 事件进行滑动响应
    ignoreTouch: function ignoreTouch() {
      return this.previewItemCount === 0 || this.previewItemCount === 1 && this.noDragWhenSingle;
    },
    // duration不正确或为0，导致不会触发transitionend函数，所以需要直接调用 transEndFn
    correctDurationAct: function correctDurationAct() {
      if (typeof this.duration !== 'number' || this.duration <= 0) {
        this.isTransToX = false;
        this.transEndFn();
      }
    }
  }
});
// CONCATENATED MODULE: ./src/preview.vue?vue&type=script&lang=js&
 /* harmony default export */ var src_previewvue_type_script_lang_js_ = (previewvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/preview.vue?vue&type=style&index=0&lang=css&
var previewvue_type_style_index_0_lang_css_ = __webpack_require__("6321");

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode /* vue-cli only */
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}

// CONCATENATED MODULE: ./src/preview.vue






/* normalize component */

var component = normalizeComponent(
  src_previewvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

component.options.__file = "preview.vue"
/* harmony default export */ var preview = (component.exports);
// CONCATENATED MODULE: ./src/index.js



var src_install = function install(Vue) {
  Vue.component(preview.name, preview);
};

/* harmony default export */ var src = (preview);

// CONCATENATED MODULE: ./node_modules/@vue/cli-service/lib/commands/build/entry-lib.js
/* concated harmony reexport VueActivePreview */__webpack_require__.d(__webpack_exports__, "VueActivePreview", function() { return preview; });
/* concated harmony reexport install */__webpack_require__.d(__webpack_exports__, "install", function() { return src_install; });


/* harmony default export */ var entry_lib = __webpack_exports__["default"] = (src);



/***/ }),

/***/ "fdef":
/***/ (function(module, exports) {

module.exports = '\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003' +
  '\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';


/***/ })

/******/ });
//# sourceMappingURL=VueActivePreview.common.js.map