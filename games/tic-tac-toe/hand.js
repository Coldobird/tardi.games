/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 4977:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var isCallable = __webpack_require__(4188);
var tryToString = __webpack_require__(3174);

var $TypeError = TypeError;

// `Assert: IsCallable(argument) is true`
module.exports = function (argument) {
  if (isCallable(argument)) return argument;
  throw new $TypeError(tryToString(argument) + ' is not a function');
};


/***/ }),

/***/ 3770:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var isObject = __webpack_require__(831);

var $String = String;
var $TypeError = TypeError;

// `Assert: Type(argument) is Object`
module.exports = function (argument) {
  if (isObject(argument)) return argument;
  throw new $TypeError($String(argument) + ' is not an object');
};


/***/ }),

/***/ 1458:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var toIndexedObject = __webpack_require__(380);
var toAbsoluteIndex = __webpack_require__(675);
var lengthOfArrayLike = __webpack_require__(9389);

// `Array.prototype.{ indexOf, includes }` methods implementation
var createMethod = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIndexedObject($this);
    var length = lengthOfArrayLike(O);
    if (length === 0) return !IS_INCLUDES && -1;
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare -- NaN check
    if (IS_INCLUDES && el !== el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare -- NaN check
      if (value !== value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) {
      if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};

module.exports = {
  // `Array.prototype.includes` method
  // https://tc39.es/ecma262/#sec-array.prototype.includes
  includes: createMethod(true),
  // `Array.prototype.indexOf` method
  // https://tc39.es/ecma262/#sec-array.prototype.indexof
  indexOf: createMethod(false)
};


/***/ }),

/***/ 5397:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var fails = __webpack_require__(5234);

module.exports = function (METHOD_NAME, argument) {
  var method = [][METHOD_NAME];
  return !!method && fails(function () {
    // eslint-disable-next-line no-useless-call -- required for testing
    method.call(null, argument || function () { return 1; }, 1);
  });
};


/***/ }),

/***/ 4224:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var DESCRIPTORS = __webpack_require__(6893);
var isArray = __webpack_require__(6719);

var $TypeError = TypeError;
// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// Safari < 13 does not throw an error in this case
var SILENT_ON_NON_WRITABLE_LENGTH_SET = DESCRIPTORS && !function () {
  // makes no sense without proper strict mode support
  if (this !== undefined) return true;
  try {
    // eslint-disable-next-line es/no-object-defineproperty -- safe
    Object.defineProperty([], 'length', { writable: false }).length = 1;
  } catch (error) {
    return error instanceof TypeError;
  }
}();

module.exports = SILENT_ON_NON_WRITABLE_LENGTH_SET ? function (O, length) {
  if (isArray(O) && !getOwnPropertyDescriptor(O, 'length').writable) {
    throw new $TypeError('Cannot set read only .length');
  } return O.length = length;
} : function (O, length) {
  return O.length = length;
};


/***/ }),

/***/ 8689:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var uncurryThis = __webpack_require__(6881);

var toString = uncurryThis({}.toString);
var stringSlice = uncurryThis(''.slice);

module.exports = function (it) {
  return stringSlice(toString(it), 8, -1);
};


/***/ }),

/***/ 8657:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var hasOwn = __webpack_require__(4418);
var ownKeys = __webpack_require__(3168);
var getOwnPropertyDescriptorModule = __webpack_require__(9304);
var definePropertyModule = __webpack_require__(4466);

module.exports = function (target, source, exceptions) {
  var keys = ownKeys(source);
  var defineProperty = definePropertyModule.f;
  var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    if (!hasOwn(target, key) && !(exceptions && hasOwn(exceptions, key))) {
      defineProperty(target, key, getOwnPropertyDescriptor(source, key));
    }
  }
};


/***/ }),

/***/ 8088:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var DESCRIPTORS = __webpack_require__(6893);
var definePropertyModule = __webpack_require__(4466);
var createPropertyDescriptor = __webpack_require__(9123);

module.exports = DESCRIPTORS ? function (object, key, value) {
  return definePropertyModule.f(object, key, createPropertyDescriptor(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),

/***/ 9123:
/***/ (function(module) {


module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),

/***/ 7509:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var isCallable = __webpack_require__(4188);
var definePropertyModule = __webpack_require__(4466);
var makeBuiltIn = __webpack_require__(4530);
var defineGlobalProperty = __webpack_require__(4798);

module.exports = function (O, key, value, options) {
  if (!options) options = {};
  var simple = options.enumerable;
  var name = options.name !== undefined ? options.name : key;
  if (isCallable(value)) makeBuiltIn(value, name, options);
  if (options.global) {
    if (simple) O[key] = value;
    else defineGlobalProperty(key, value);
  } else {
    try {
      if (!options.unsafe) delete O[key];
      else if (O[key]) simple = true;
    } catch (error) { /* empty */ }
    if (simple) O[key] = value;
    else definePropertyModule.f(O, key, {
      value: value,
      enumerable: false,
      configurable: !options.nonConfigurable,
      writable: !options.nonWritable
    });
  } return O;
};


/***/ }),

/***/ 4798:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var globalThis = __webpack_require__(9117);

// eslint-disable-next-line es/no-object-defineproperty -- safe
var defineProperty = Object.defineProperty;

module.exports = function (key, value) {
  try {
    defineProperty(globalThis, key, { value: value, configurable: true, writable: true });
  } catch (error) {
    globalThis[key] = value;
  } return value;
};


/***/ }),

/***/ 6893:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var fails = __webpack_require__(5234);

// Detect IE8's incomplete defineProperty implementation
module.exports = !fails(function () {
  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
  return Object.defineProperty({}, 1, { get: function () { return 7; } })[1] !== 7;
});


/***/ }),

/***/ 5926:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var globalThis = __webpack_require__(9117);
var isObject = __webpack_require__(831);

var document = globalThis.document;
// typeof document.createElement is 'object' in old IE
var EXISTS = isObject(document) && isObject(document.createElement);

module.exports = function (it) {
  return EXISTS ? document.createElement(it) : {};
};


/***/ }),

/***/ 2197:
/***/ (function(module) {


var $TypeError = TypeError;
var MAX_SAFE_INTEGER = 0x1FFFFFFFFFFFFF; // 2 ** 53 - 1 == 9007199254740991

module.exports = function (it) {
  if (it > MAX_SAFE_INTEGER) throw new $TypeError('Maximum allowed index exceeded');
  return it;
};


/***/ }),

/***/ 1274:
/***/ (function(module) {


// IE8- don't enum bug keys
module.exports = [
  'constructor',
  'hasOwnProperty',
  'isPrototypeOf',
  'propertyIsEnumerable',
  'toLocaleString',
  'toString',
  'valueOf'
];


/***/ }),

/***/ 8060:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var globalThis = __webpack_require__(9117);

var navigator = globalThis.navigator;
var userAgent = navigator && navigator.userAgent;

module.exports = userAgent ? String(userAgent) : '';


/***/ }),

/***/ 3008:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var globalThis = __webpack_require__(9117);
var userAgent = __webpack_require__(8060);

var process = globalThis.process;
var Deno = globalThis.Deno;
var versions = process && process.versions || Deno && Deno.version;
var v8 = versions && versions.v8;
var match, version;

if (v8) {
  match = v8.split('.');
  // in old Chrome, versions of V8 isn't V8 = Chrome / 10
  // but their correct versions are not interesting for us
  version = match[0] > 0 && match[0] < 4 ? 1 : +(match[0] + match[1]);
}

// BrowserFS NodeJS `process` polyfill incorrectly set `.v8` to `0.0`
// so check `userAgent` even if `.v8` exists, but 0
if (!version && userAgent) {
  match = userAgent.match(/Edge\/(\d+)/);
  if (!match || match[1] >= 74) {
    match = userAgent.match(/Chrome\/(\d+)/);
    if (match) version = +match[1];
  }
}

module.exports = version;


/***/ }),

/***/ 5613:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var globalThis = __webpack_require__(9117);
var getOwnPropertyDescriptor = (__webpack_require__(9304).f);
var createNonEnumerableProperty = __webpack_require__(8088);
var defineBuiltIn = __webpack_require__(7509);
var defineGlobalProperty = __webpack_require__(4798);
var copyConstructorProperties = __webpack_require__(8657);
var isForced = __webpack_require__(8489);

/*
  options.target         - name of the target object
  options.global         - target is the global object
  options.stat           - export as static methods of target
  options.proto          - export as prototype methods of target
  options.real           - real prototype method for the `pure` version
  options.forced         - export even if the native feature is available
  options.bind           - bind methods to the target, required for the `pure` version
  options.wrap           - wrap constructors to preventing global pollution, required for the `pure` version
  options.unsafe         - use the simple assignment of property instead of delete + defineProperty
  options.sham           - add a flag to not completely full polyfills
  options.enumerable     - export as enumerable property
  options.dontCallGetSet - prevent calling a getter on target
  options.name           - the .name of the function if it does not match the key
*/
module.exports = function (options, source) {
  var TARGET = options.target;
  var GLOBAL = options.global;
  var STATIC = options.stat;
  var FORCED, target, key, targetProperty, sourceProperty, descriptor;
  if (GLOBAL) {
    target = globalThis;
  } else if (STATIC) {
    target = globalThis[TARGET] || defineGlobalProperty(TARGET, {});
  } else {
    target = globalThis[TARGET] && globalThis[TARGET].prototype;
  }
  if (target) for (key in source) {
    sourceProperty = source[key];
    if (options.dontCallGetSet) {
      descriptor = getOwnPropertyDescriptor(target, key);
      targetProperty = descriptor && descriptor.value;
    } else targetProperty = target[key];
    FORCED = isForced(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced);
    // contained in target
    if (!FORCED && targetProperty !== undefined) {
      if (typeof sourceProperty == typeof targetProperty) continue;
      copyConstructorProperties(sourceProperty, targetProperty);
    }
    // add a flag to not completely full polyfills
    if (options.sham || (targetProperty && targetProperty.sham)) {
      createNonEnumerableProperty(sourceProperty, 'sham', true);
    }
    defineBuiltIn(target, key, sourceProperty, options);
  }
};


/***/ }),

/***/ 5234:
/***/ (function(module) {


module.exports = function (exec) {
  try {
    return !!exec();
  } catch (error) {
    return true;
  }
};


/***/ }),

/***/ 9055:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var fails = __webpack_require__(5234);

module.exports = !fails(function () {
  // eslint-disable-next-line es/no-function-prototype-bind -- safe
  var test = function () { /* empty */ }.bind();
  // eslint-disable-next-line no-prototype-builtins -- safe
  return typeof test != 'function' || test.hasOwnProperty('prototype');
});


/***/ }),

/***/ 9944:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var NATIVE_BIND = __webpack_require__(9055);

var call = Function.prototype.call;
// eslint-disable-next-line es/no-function-prototype-bind -- safe
module.exports = NATIVE_BIND ? call.bind(call) : function () {
  return call.apply(call, arguments);
};


/***/ }),

/***/ 2735:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var DESCRIPTORS = __webpack_require__(6893);
var hasOwn = __webpack_require__(4418);

var FunctionPrototype = Function.prototype;
// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var getDescriptor = DESCRIPTORS && Object.getOwnPropertyDescriptor;

var EXISTS = hasOwn(FunctionPrototype, 'name');
// additional protection from minified / mangled / dropped function names
var PROPER = EXISTS && function something() { /* empty */ }.name === 'something';
var CONFIGURABLE = EXISTS && (!DESCRIPTORS || (DESCRIPTORS && getDescriptor(FunctionPrototype, 'name').configurable));

module.exports = {
  EXISTS: EXISTS,
  PROPER: PROPER,
  CONFIGURABLE: CONFIGURABLE
};


/***/ }),

/***/ 5691:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var classofRaw = __webpack_require__(8689);
var uncurryThis = __webpack_require__(6881);

module.exports = function (fn) {
  // Nashorn bug:
  //   https://github.com/zloirock/core-js/issues/1128
  //   https://github.com/zloirock/core-js/issues/1130
  if (classofRaw(fn) === 'Function') return uncurryThis(fn);
};


/***/ }),

/***/ 6881:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var NATIVE_BIND = __webpack_require__(9055);

var FunctionPrototype = Function.prototype;
var call = FunctionPrototype.call;
// eslint-disable-next-line es/no-function-prototype-bind -- safe
var uncurryThisWithBind = NATIVE_BIND && FunctionPrototype.bind.bind(call, call);

module.exports = NATIVE_BIND ? uncurryThisWithBind : function (fn) {
  return function () {
    return call.apply(fn, arguments);
  };
};


/***/ }),

/***/ 5604:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var globalThis = __webpack_require__(9117);
var isCallable = __webpack_require__(4188);

var aFunction = function (argument) {
  return isCallable(argument) ? argument : undefined;
};

module.exports = function (namespace, method) {
  return arguments.length < 2 ? aFunction(globalThis[namespace]) : globalThis[namespace] && globalThis[namespace][method];
};


/***/ }),

/***/ 2913:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var aCallable = __webpack_require__(4977);
var isNullOrUndefined = __webpack_require__(4318);

// `GetMethod` abstract operation
// https://tc39.es/ecma262/#sec-getmethod
module.exports = function (V, P) {
  var func = V[P];
  return isNullOrUndefined(func) ? undefined : aCallable(func);
};


/***/ }),

/***/ 9117:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var check = function (it) {
  return it && it.Math === Math && it;
};

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
module.exports =
  // eslint-disable-next-line es/no-global-this -- safe
  check(typeof globalThis == 'object' && globalThis) ||
  check(typeof window == 'object' && window) ||
  // eslint-disable-next-line no-restricted-globals -- safe
  check(typeof self == 'object' && self) ||
  check(typeof __webpack_require__.g == 'object' && __webpack_require__.g) ||
  check(typeof this == 'object' && this) ||
  // eslint-disable-next-line no-new-func -- fallback
  (function () { return this; })() || Function('return this')();


/***/ }),

/***/ 4418:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var uncurryThis = __webpack_require__(6881);
var toObject = __webpack_require__(3628);

var hasOwnProperty = uncurryThis({}.hasOwnProperty);

// `HasOwnProperty` abstract operation
// https://tc39.es/ecma262/#sec-hasownproperty
// eslint-disable-next-line es/no-object-hasown -- safe
module.exports = Object.hasOwn || function hasOwn(it, key) {
  return hasOwnProperty(toObject(it), key);
};


/***/ }),

/***/ 7588:
/***/ (function(module) {


module.exports = {};


/***/ }),

/***/ 9622:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var DESCRIPTORS = __webpack_require__(6893);
var fails = __webpack_require__(5234);
var createElement = __webpack_require__(5926);

// Thanks to IE8 for its funny defineProperty
module.exports = !DESCRIPTORS && !fails(function () {
  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
  return Object.defineProperty(createElement('div'), 'a', {
    get: function () { return 7; }
  }).a !== 7;
});


/***/ }),

/***/ 7568:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var uncurryThis = __webpack_require__(6881);
var fails = __webpack_require__(5234);
var classof = __webpack_require__(8689);

var $Object = Object;
var split = uncurryThis(''.split);

// fallback for non-array-like ES3 and non-enumerable old V8 strings
module.exports = fails(function () {
  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
  // eslint-disable-next-line no-prototype-builtins -- safe
  return !$Object('z').propertyIsEnumerable(0);
}) ? function (it) {
  return classof(it) === 'String' ? split(it, '') : $Object(it);
} : $Object;


/***/ }),

/***/ 3029:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var uncurryThis = __webpack_require__(6881);
var isCallable = __webpack_require__(4188);
var store = __webpack_require__(2694);

var functionToString = uncurryThis(Function.toString);

// this helper broken in `core-js@3.4.1-3.4.4`, so we can't use `shared` helper
if (!isCallable(store.inspectSource)) {
  store.inspectSource = function (it) {
    return functionToString(it);
  };
}

module.exports = store.inspectSource;


/***/ }),

/***/ 3086:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var NATIVE_WEAK_MAP = __webpack_require__(5945);
var globalThis = __webpack_require__(9117);
var isObject = __webpack_require__(831);
var createNonEnumerableProperty = __webpack_require__(8088);
var hasOwn = __webpack_require__(4418);
var shared = __webpack_require__(2694);
var sharedKey = __webpack_require__(168);
var hiddenKeys = __webpack_require__(7588);

var OBJECT_ALREADY_INITIALIZED = 'Object already initialized';
var TypeError = globalThis.TypeError;
var WeakMap = globalThis.WeakMap;
var set, get, has;

var enforce = function (it) {
  return has(it) ? get(it) : set(it, {});
};

var getterFor = function (TYPE) {
  return function (it) {
    var state;
    if (!isObject(it) || (state = get(it)).type !== TYPE) {
      throw new TypeError('Incompatible receiver, ' + TYPE + ' required');
    } return state;
  };
};

if (NATIVE_WEAK_MAP || shared.state) {
  var store = shared.state || (shared.state = new WeakMap());
  /* eslint-disable no-self-assign -- prototype methods protection */
  store.get = store.get;
  store.has = store.has;
  store.set = store.set;
  /* eslint-enable no-self-assign -- prototype methods protection */
  set = function (it, metadata) {
    if (store.has(it)) throw new TypeError(OBJECT_ALREADY_INITIALIZED);
    metadata.facade = it;
    store.set(it, metadata);
    return metadata;
  };
  get = function (it) {
    return store.get(it) || {};
  };
  has = function (it) {
    return store.has(it);
  };
} else {
  var STATE = sharedKey('state');
  hiddenKeys[STATE] = true;
  set = function (it, metadata) {
    if (hasOwn(it, STATE)) throw new TypeError(OBJECT_ALREADY_INITIALIZED);
    metadata.facade = it;
    createNonEnumerableProperty(it, STATE, metadata);
    return metadata;
  };
  get = function (it) {
    return hasOwn(it, STATE) ? it[STATE] : {};
  };
  has = function (it) {
    return hasOwn(it, STATE);
  };
}

module.exports = {
  set: set,
  get: get,
  has: has,
  enforce: enforce,
  getterFor: getterFor
};


/***/ }),

/***/ 6719:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var classof = __webpack_require__(8689);

// `IsArray` abstract operation
// https://tc39.es/ecma262/#sec-isarray
// eslint-disable-next-line es/no-array-isarray -- safe
module.exports = Array.isArray || function isArray(argument) {
  return classof(argument) === 'Array';
};


/***/ }),

/***/ 4188:
/***/ (function(module) {


// https://tc39.es/ecma262/#sec-IsHTMLDDA-internal-slot
var documentAll = typeof document == 'object' && document.all;

// `IsCallable` abstract operation
// https://tc39.es/ecma262/#sec-iscallable
// eslint-disable-next-line unicorn/no-typeof-undefined -- required for testing
module.exports = typeof documentAll == 'undefined' && documentAll !== undefined ? function (argument) {
  return typeof argument == 'function' || argument === documentAll;
} : function (argument) {
  return typeof argument == 'function';
};


/***/ }),

/***/ 8489:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var fails = __webpack_require__(5234);
var isCallable = __webpack_require__(4188);

var replacement = /#|\.prototype\./;

var isForced = function (feature, detection) {
  var value = data[normalize(feature)];
  return value === POLYFILL ? true
    : value === NATIVE ? false
    : isCallable(detection) ? fails(detection)
    : !!detection;
};

var normalize = isForced.normalize = function (string) {
  return String(string).replace(replacement, '.').toLowerCase();
};

var data = isForced.data = {};
var NATIVE = isForced.NATIVE = 'N';
var POLYFILL = isForced.POLYFILL = 'P';

module.exports = isForced;


/***/ }),

/***/ 4318:
/***/ (function(module) {


// we can't use just `it == null` since of `document.all` special case
// https://tc39.es/ecma262/#sec-IsHTMLDDA-internal-slot-aec
module.exports = function (it) {
  return it === null || it === undefined;
};


/***/ }),

/***/ 831:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var isCallable = __webpack_require__(4188);

module.exports = function (it) {
  return typeof it == 'object' ? it !== null : isCallable(it);
};


/***/ }),

/***/ 1942:
/***/ (function(module) {


module.exports = false;


/***/ }),

/***/ 6032:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var getBuiltIn = __webpack_require__(5604);
var isCallable = __webpack_require__(4188);
var isPrototypeOf = __webpack_require__(4578);
var USE_SYMBOL_AS_UID = __webpack_require__(9809);

var $Object = Object;

module.exports = USE_SYMBOL_AS_UID ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  var $Symbol = getBuiltIn('Symbol');
  return isCallable($Symbol) && isPrototypeOf($Symbol.prototype, $Object(it));
};


/***/ }),

/***/ 9389:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var toLength = __webpack_require__(7611);

// `LengthOfArrayLike` abstract operation
// https://tc39.es/ecma262/#sec-lengthofarraylike
module.exports = function (obj) {
  return toLength(obj.length);
};


/***/ }),

/***/ 4530:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var uncurryThis = __webpack_require__(6881);
var fails = __webpack_require__(5234);
var isCallable = __webpack_require__(4188);
var hasOwn = __webpack_require__(4418);
var DESCRIPTORS = __webpack_require__(6893);
var CONFIGURABLE_FUNCTION_NAME = (__webpack_require__(2735).CONFIGURABLE);
var inspectSource = __webpack_require__(3029);
var InternalStateModule = __webpack_require__(3086);

var enforceInternalState = InternalStateModule.enforce;
var getInternalState = InternalStateModule.get;
var $String = String;
// eslint-disable-next-line es/no-object-defineproperty -- safe
var defineProperty = Object.defineProperty;
var stringSlice = uncurryThis(''.slice);
var replace = uncurryThis(''.replace);
var join = uncurryThis([].join);

var CONFIGURABLE_LENGTH = DESCRIPTORS && !fails(function () {
  return defineProperty(function () { /* empty */ }, 'length', { value: 8 }).length !== 8;
});

var TEMPLATE = String(String).split('String');

var makeBuiltIn = module.exports = function (value, name, options) {
  if (stringSlice($String(name), 0, 7) === 'Symbol(') {
    name = '[' + replace($String(name), /^Symbol\(([^)]*)\).*$/, '$1') + ']';
  }
  if (options && options.getter) name = 'get ' + name;
  if (options && options.setter) name = 'set ' + name;
  if (!hasOwn(value, 'name') || (CONFIGURABLE_FUNCTION_NAME && value.name !== name)) {
    if (DESCRIPTORS) defineProperty(value, 'name', { value: name, configurable: true });
    else value.name = name;
  }
  if (CONFIGURABLE_LENGTH && options && hasOwn(options, 'arity') && value.length !== options.arity) {
    defineProperty(value, 'length', { value: options.arity });
  }
  try {
    if (options && hasOwn(options, 'constructor') && options.constructor) {
      if (DESCRIPTORS) defineProperty(value, 'prototype', { writable: false });
    // in V8 ~ Chrome 53, prototypes of some methods, like `Array.prototype.values`, are non-writable
    } else if (value.prototype) value.prototype = undefined;
  } catch (error) { /* empty */ }
  var state = enforceInternalState(value);
  if (!hasOwn(state, 'source')) {
    state.source = join(TEMPLATE, typeof name == 'string' ? name : '');
  } return value;
};

// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
// eslint-disable-next-line no-extend-native -- required
Function.prototype.toString = makeBuiltIn(function toString() {
  return isCallable(this) && getInternalState(this).source || inspectSource(this);
}, 'toString');


/***/ }),

/***/ 142:
/***/ (function(module) {


var ceil = Math.ceil;
var floor = Math.floor;

// `Math.trunc` method
// https://tc39.es/ecma262/#sec-math.trunc
// eslint-disable-next-line es/no-math-trunc -- safe
module.exports = Math.trunc || function trunc(x) {
  var n = +x;
  return (n > 0 ? floor : ceil)(n);
};


/***/ }),

/***/ 4466:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var DESCRIPTORS = __webpack_require__(6893);
var IE8_DOM_DEFINE = __webpack_require__(9622);
var V8_PROTOTYPE_DEFINE_BUG = __webpack_require__(3315);
var anObject = __webpack_require__(3770);
var toPropertyKey = __webpack_require__(2344);

var $TypeError = TypeError;
// eslint-disable-next-line es/no-object-defineproperty -- safe
var $defineProperty = Object.defineProperty;
// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
var ENUMERABLE = 'enumerable';
var CONFIGURABLE = 'configurable';
var WRITABLE = 'writable';

// `Object.defineProperty` method
// https://tc39.es/ecma262/#sec-object.defineproperty
exports.f = DESCRIPTORS ? V8_PROTOTYPE_DEFINE_BUG ? function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPropertyKey(P);
  anObject(Attributes);
  if (typeof O === 'function' && P === 'prototype' && 'value' in Attributes && WRITABLE in Attributes && !Attributes[WRITABLE]) {
    var current = $getOwnPropertyDescriptor(O, P);
    if (current && current[WRITABLE]) {
      O[P] = Attributes.value;
      Attributes = {
        configurable: CONFIGURABLE in Attributes ? Attributes[CONFIGURABLE] : current[CONFIGURABLE],
        enumerable: ENUMERABLE in Attributes ? Attributes[ENUMERABLE] : current[ENUMERABLE],
        writable: false
      };
    }
  } return $defineProperty(O, P, Attributes);
} : $defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPropertyKey(P);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return $defineProperty(O, P, Attributes);
  } catch (error) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw new $TypeError('Accessors not supported');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),

/***/ 9304:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var DESCRIPTORS = __webpack_require__(6893);
var call = __webpack_require__(9944);
var propertyIsEnumerableModule = __webpack_require__(4416);
var createPropertyDescriptor = __webpack_require__(9123);
var toIndexedObject = __webpack_require__(380);
var toPropertyKey = __webpack_require__(2344);
var hasOwn = __webpack_require__(4418);
var IE8_DOM_DEFINE = __webpack_require__(9622);

// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// `Object.getOwnPropertyDescriptor` method
// https://tc39.es/ecma262/#sec-object.getownpropertydescriptor
exports.f = DESCRIPTORS ? $getOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
  O = toIndexedObject(O);
  P = toPropertyKey(P);
  if (IE8_DOM_DEFINE) try {
    return $getOwnPropertyDescriptor(O, P);
  } catch (error) { /* empty */ }
  if (hasOwn(O, P)) return createPropertyDescriptor(!call(propertyIsEnumerableModule.f, O, P), O[P]);
};


/***/ }),

/***/ 5629:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var internalObjectKeys = __webpack_require__(1843);
var enumBugKeys = __webpack_require__(1274);

var hiddenKeys = enumBugKeys.concat('length', 'prototype');

// `Object.getOwnPropertyNames` method
// https://tc39.es/ecma262/#sec-object.getownpropertynames
// eslint-disable-next-line es/no-object-getownpropertynames -- safe
exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return internalObjectKeys(O, hiddenKeys);
};


/***/ }),

/***/ 156:
/***/ (function(__unused_webpack_module, exports) {


// eslint-disable-next-line es/no-object-getownpropertysymbols -- safe
exports.f = Object.getOwnPropertySymbols;


/***/ }),

/***/ 4578:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var uncurryThis = __webpack_require__(6881);

module.exports = uncurryThis({}.isPrototypeOf);


/***/ }),

/***/ 1843:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var uncurryThis = __webpack_require__(6881);
var hasOwn = __webpack_require__(4418);
var toIndexedObject = __webpack_require__(380);
var indexOf = (__webpack_require__(1458).indexOf);
var hiddenKeys = __webpack_require__(7588);

var push = uncurryThis([].push);

module.exports = function (object, names) {
  var O = toIndexedObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) !hasOwn(hiddenKeys, key) && hasOwn(O, key) && push(result, key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (hasOwn(O, key = names[i++])) {
    ~indexOf(result, key) || push(result, key);
  }
  return result;
};


/***/ }),

/***/ 4416:
/***/ (function(__unused_webpack_module, exports) {


var $propertyIsEnumerable = {}.propertyIsEnumerable;
// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// Nashorn ~ JDK8 bug
var NASHORN_BUG = getOwnPropertyDescriptor && !$propertyIsEnumerable.call({ 1: 2 }, 1);

// `Object.prototype.propertyIsEnumerable` method implementation
// https://tc39.es/ecma262/#sec-object.prototype.propertyisenumerable
exports.f = NASHORN_BUG ? function propertyIsEnumerable(V) {
  var descriptor = getOwnPropertyDescriptor(this, V);
  return !!descriptor && descriptor.enumerable;
} : $propertyIsEnumerable;


/***/ }),

/***/ 2287:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var call = __webpack_require__(9944);
var isCallable = __webpack_require__(4188);
var isObject = __webpack_require__(831);

var $TypeError = TypeError;

// `OrdinaryToPrimitive` abstract operation
// https://tc39.es/ecma262/#sec-ordinarytoprimitive
module.exports = function (input, pref) {
  var fn, val;
  if (pref === 'string' && isCallable(fn = input.toString) && !isObject(val = call(fn, input))) return val;
  if (isCallable(fn = input.valueOf) && !isObject(val = call(fn, input))) return val;
  if (pref !== 'string' && isCallable(fn = input.toString) && !isObject(val = call(fn, input))) return val;
  throw new $TypeError("Can't convert object to primitive value");
};


/***/ }),

/***/ 3168:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var getBuiltIn = __webpack_require__(5604);
var uncurryThis = __webpack_require__(6881);
var getOwnPropertyNamesModule = __webpack_require__(5629);
var getOwnPropertySymbolsModule = __webpack_require__(156);
var anObject = __webpack_require__(3770);

var concat = uncurryThis([].concat);

// all object keys, includes non-enumerable and symbols
module.exports = getBuiltIn('Reflect', 'ownKeys') || function ownKeys(it) {
  var keys = getOwnPropertyNamesModule.f(anObject(it));
  var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
  return getOwnPropertySymbols ? concat(keys, getOwnPropertySymbols(it)) : keys;
};


/***/ }),

/***/ 9509:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var isNullOrUndefined = __webpack_require__(4318);

var $TypeError = TypeError;

// `RequireObjectCoercible` abstract operation
// https://tc39.es/ecma262/#sec-requireobjectcoercible
module.exports = function (it) {
  if (isNullOrUndefined(it)) throw new $TypeError("Can't call method on " + it);
  return it;
};


/***/ }),

/***/ 168:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var shared = __webpack_require__(746);
var uid = __webpack_require__(6209);

var keys = shared('keys');

module.exports = function (key) {
  return keys[key] || (keys[key] = uid(key));
};


/***/ }),

/***/ 2694:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var IS_PURE = __webpack_require__(1942);
var globalThis = __webpack_require__(9117);
var defineGlobalProperty = __webpack_require__(4798);

var SHARED = '__core-js_shared__';
var store = module.exports = globalThis[SHARED] || defineGlobalProperty(SHARED, {});

(store.versions || (store.versions = [])).push({
  version: '3.49.0',
  mode: IS_PURE ? 'pure' : 'global',
  copyright: '© 2013–2025 Denis Pushkarev (zloirock.ru), 2025–2026 CoreJS Company (core-js.io). All rights reserved.',
  license: 'https://github.com/zloirock/core-js/blob/v3.49.0/LICENSE',
  source: 'https://github.com/zloirock/core-js'
});


/***/ }),

/***/ 746:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var store = __webpack_require__(2694);

module.exports = function (key, value) {
  return store[key] || (store[key] = value || {});
};


/***/ }),

/***/ 8944:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


/* eslint-disable es/no-symbol -- required for testing */
var V8_VERSION = __webpack_require__(3008);
var fails = __webpack_require__(5234);
var globalThis = __webpack_require__(9117);

var $String = globalThis.String;

// eslint-disable-next-line es/no-object-getownpropertysymbols -- required for testing
module.exports = !!Object.getOwnPropertySymbols && !fails(function () {
  var symbol = Symbol('symbol detection');
  // Chrome 38 Symbol has incorrect toString conversion
  // `get-own-property-symbols` polyfill symbols converted to object are not Symbol instances
  // nb: Do not call `String` directly to avoid this being optimized out to `symbol+''` which will,
  // of course, fail.
  return !$String(symbol) || !(Object(symbol) instanceof Symbol) ||
    // Chrome 38-40 symbols are not inherited from DOM collections prototypes to instances
    !Symbol.sham && V8_VERSION && V8_VERSION < 41;
});


/***/ }),

/***/ 675:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var toIntegerOrInfinity = __webpack_require__(6744);

var max = Math.max;
var min = Math.min;

// Helper for a popular repeating case of the spec:
// Let integer be ? ToInteger(index).
// If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).
module.exports = function (index, length) {
  var integer = toIntegerOrInfinity(index);
  return integer < 0 ? max(integer + length, 0) : min(integer, length);
};


/***/ }),

/***/ 380:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


// toObject with fallback for non-array-like ES3 strings
var IndexedObject = __webpack_require__(7568);
var requireObjectCoercible = __webpack_require__(9509);

module.exports = function (it) {
  return IndexedObject(requireObjectCoercible(it));
};


/***/ }),

/***/ 6744:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var trunc = __webpack_require__(142);

// `ToIntegerOrInfinity` abstract operation
// https://tc39.es/ecma262/#sec-tointegerorinfinity
module.exports = function (argument) {
  var number = +argument;
  // eslint-disable-next-line no-self-compare -- NaN check
  return number !== number || number === 0 ? 0 : trunc(number);
};


/***/ }),

/***/ 7611:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var toIntegerOrInfinity = __webpack_require__(6744);

var min = Math.min;

// `ToLength` abstract operation
// https://tc39.es/ecma262/#sec-tolength
module.exports = function (argument) {
  var len = toIntegerOrInfinity(argument);
  return len > 0 ? min(len, 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
};


/***/ }),

/***/ 3628:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var requireObjectCoercible = __webpack_require__(9509);

var $Object = Object;

// `ToObject` abstract operation
// https://tc39.es/ecma262/#sec-toobject
module.exports = function (argument) {
  return $Object(requireObjectCoercible(argument));
};


/***/ }),

/***/ 290:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var call = __webpack_require__(9944);
var isObject = __webpack_require__(831);
var isSymbol = __webpack_require__(6032);
var getMethod = __webpack_require__(2913);
var ordinaryToPrimitive = __webpack_require__(2287);
var wellKnownSymbol = __webpack_require__(4282);

var $TypeError = TypeError;
var TO_PRIMITIVE = wellKnownSymbol('toPrimitive');

// `ToPrimitive` abstract operation
// https://tc39.es/ecma262/#sec-toprimitive
module.exports = function (input, pref) {
  if (!isObject(input) || isSymbol(input)) return input;
  var exoticToPrim = getMethod(input, TO_PRIMITIVE);
  var result;
  if (exoticToPrim) {
    if (pref === undefined) pref = 'default';
    result = call(exoticToPrim, input, pref);
    if (!isObject(result) || isSymbol(result)) return result;
    throw new $TypeError("Can't convert object to primitive value");
  }
  if (pref === undefined) pref = 'number';
  return ordinaryToPrimitive(input, pref);
};


/***/ }),

/***/ 2344:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var toPrimitive = __webpack_require__(290);
var isSymbol = __webpack_require__(6032);

// `ToPropertyKey` abstract operation
// https://tc39.es/ecma262/#sec-topropertykey
module.exports = function (argument) {
  var key = toPrimitive(argument, 'string');
  return isSymbol(key) ? key : key + '';
};


/***/ }),

/***/ 3174:
/***/ (function(module) {


var $String = String;

module.exports = function (argument) {
  try {
    return $String(argument);
  } catch (error) {
    return 'Object';
  }
};


/***/ }),

/***/ 6209:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var uncurryThis = __webpack_require__(6881);

var id = 0;
var postfix = Math.random();
var toString = uncurryThis(1.1.toString);

module.exports = function (key) {
  return 'Symbol(' + (key === undefined ? '' : key) + ')_' + toString(++id + postfix, 36);
};


/***/ }),

/***/ 9809:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


/* eslint-disable es/no-symbol -- required for testing */
var NATIVE_SYMBOL = __webpack_require__(8944);

module.exports = NATIVE_SYMBOL &&
  !Symbol.sham &&
  typeof Symbol.iterator == 'symbol';


/***/ }),

/***/ 3315:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var DESCRIPTORS = __webpack_require__(6893);
var fails = __webpack_require__(5234);

// V8 ~ Chrome 36-
// https://bugs.chromium.org/p/v8/issues/detail?id=3334
module.exports = DESCRIPTORS && fails(function () {
  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
  return Object.defineProperty(function () { /* empty */ }, 'prototype', {
    value: 42,
    writable: false
  }).prototype !== 42;
});


/***/ }),

/***/ 5945:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var globalThis = __webpack_require__(9117);
var isCallable = __webpack_require__(4188);

var WeakMap = globalThis.WeakMap;

module.exports = isCallable(WeakMap) && /native code/.test(String(WeakMap));


/***/ }),

/***/ 4282:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var globalThis = __webpack_require__(9117);
var shared = __webpack_require__(746);
var hasOwn = __webpack_require__(4418);
var uid = __webpack_require__(6209);
var NATIVE_SYMBOL = __webpack_require__(8944);
var USE_SYMBOL_AS_UID = __webpack_require__(9809);

var Symbol = globalThis.Symbol;
var WellKnownSymbolsStore = shared('wks');
var createWellKnownSymbol = USE_SYMBOL_AS_UID ? Symbol['for'] || Symbol : Symbol && Symbol.withoutSetter || uid;

module.exports = function (name) {
  if (!hasOwn(WellKnownSymbolsStore, name)) {
    WellKnownSymbolsStore[name] = NATIVE_SYMBOL && hasOwn(Symbol, name)
      ? Symbol[name]
      : createWellKnownSymbol('Symbol.' + name);
  } return WellKnownSymbolsStore[name];
};


/***/ }),

/***/ 4149:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {


/* eslint-disable es/no-array-prototype-indexof -- required for testing */
var $ = __webpack_require__(5613);
var uncurryThis = __webpack_require__(5691);
var $indexOf = (__webpack_require__(1458).indexOf);
var arrayMethodIsStrict = __webpack_require__(5397);

var nativeIndexOf = uncurryThis([].indexOf);

var NEGATIVE_ZERO = !!nativeIndexOf && 1 / nativeIndexOf([1], 1, -0) < 0;
var FORCED = NEGATIVE_ZERO || !arrayMethodIsStrict('indexOf');

// `Array.prototype.indexOf` method
// https://tc39.es/ecma262/#sec-array.prototype.indexof
$({ target: 'Array', proto: true, forced: FORCED }, {
  indexOf: function indexOf(searchElement /* , fromIndex = 0 */) {
    var fromIndex = arguments.length > 1 ? arguments[1] : undefined;
    return NEGATIVE_ZERO
      // convert -0 to +0
      ? nativeIndexOf(this, searchElement, fromIndex) || 0
      : $indexOf(this, searchElement, fromIndex);
  }
});


/***/ }),

/***/ 9375:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {


var $ = __webpack_require__(5613);
var toObject = __webpack_require__(3628);
var lengthOfArrayLike = __webpack_require__(9389);
var setArrayLength = __webpack_require__(4224);
var doesNotExceedSafeInteger = __webpack_require__(2197);
var fails = __webpack_require__(5234);

var INCORRECT_TO_LENGTH = fails(function () {
  return [].push.call({ length: 0x100000000 }, 1) !== 4294967297;
});

// V8 <= 121 and Safari <= 15.4; FF < 23 throws InternalError
// https://bugs.chromium.org/p/v8/issues/detail?id=12681
var properErrorOnNonWritableLength = function () {
  try {
    // eslint-disable-next-line es/no-object-defineproperty -- safe
    Object.defineProperty([], 'length', { writable: false }).push();
  } catch (error) {
    return error instanceof TypeError;
  }
};

var FORCED = INCORRECT_TO_LENGTH || !properErrorOnNonWritableLength();

// `Array.prototype.push` method
// https://tc39.es/ecma262/#sec-array.prototype.push
$({ target: 'Array', proto: true, arity: 1, forced: FORCED }, {
  // eslint-disable-next-line no-unused-vars -- required for `.length`
  push: function push(item) {
    var O = toObject(this);
    var len = lengthOfArrayLike(O);
    var argCount = arguments.length;
    doesNotExceedSafeInteger(len + argCount);
    for (var i = 0; i < argCount; i++) {
      O[len] = arguments[i];
      len++;
    }
    setArrayLength(O, len);
    return len;
  }
});


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
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/global */
/******/ 	!function() {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};

// EXTERNAL MODULE: ../../node_modules/core-js/modules/es.array.push.js
var es_array_push = __webpack_require__(9375);
;// ../../packages/tardi-sdk/hand.js

// TardiHand SDK. A game's hand.js imports these and the build bundles them in:
//
//   import { joinMatch, sendToTable } from '@tardi/sdk/hand'
//
// TardiHand <-> Hand host message protocol:
//
// Host to Hand SDK:
// - intent: 'tardi.table.sendGameStateToHand'
// - matchVersion: the match state version represented by this envelope.
// - handSeq: the last Hand message sequence the Table has incorporated for
//   this Hand. The Hand sends its next message as handSeq + 1.
// - playerId, players, messageFromTable: public game state passed to the
//   game's onStateChange callback once it is safe to render.
//
// Hand SDK to Host:
// - intent: 'tardi.hand.sendMessageToTable'
// - handSeq: the sequence number for messageFromHand. The Hand retries the
//   queue head until the host later reports that sequence in handSeq.
// - messageFromHand: the game's payload for the Table.
//
// Hand SDK to Host:
// - intent: 'tardi.hand.ackTableState'
// - matchVersion: the latest match state version delivered to the game. The host
//   uses this to stop resending that match state to this Hand.
//
// Ordering rules:
// - sendToTable before the first host state is ignored because the
//   Hand does not yet know its next handSeq.
// - A Table state is delivered to the game only when there are no queued Hand
//   messages waiting to be incorporated by the Table.

var RETRY_MS = 500;
var onStateChangeHandler = null;
var messagesToSend = [];
var nextMessageSeq = -1; // -1 means we dont know yet. We might be a reloaded hand
// and the previous incarnation might have already sent messages.
// So initially we send acks wait for some tableState so we can sync this seq.

var highestMatchVersion = 0;
function joinMatch(options) {
  if (onStateChangeHandler) {
    throw "joinMatch was called more than once";
  }
  onStateChangeHandler = options.onStateChange;
  if (!onStateChangeHandler) {
    throw "joinMatch must receive {onStateChange: <some-function>}";
  }
  window.addEventListener('message', handleMessage);
  setInterval(transmitIfNecessary, RETRY_MS);
}
function sendToTable(message) {
  if (nextMessageSeq === -1) {
    return;
  }
  messagesToSend.push(message);
  transmitIfNecessary();
}
function handleMessage(event) {
  var envelope = event.data || {};
  if (envelope.intent !== 'tardi.table.sendGameStateToHand') {
    return;
  }
  var handSeq = envelope.handSeq;
  handleAck(handSeq);
  if (messagesToSend.length === 0 && envelope.matchVersion > highestMatchVersion) {
    highestMatchVersion = envelope.matchVersion;
    notifyGame(envelope.playerId, envelope.players, envelope.messageFromTable);
    ackTableState();
  }
}
function handleAck(ackedSeq) {
  if (ackedSeq > nextMessageSeq) {
    messagesToSend = []; // For the case of weird concurrent Hand sessions in different tabs.
    nextMessageSeq = ackedSeq + 1;
    return;
  }
  if (ackedSeq < nextMessageSeq) {
    // Old ack.
    return;
  }

  // ackedSeq is equal to nextMessageSeq
  messagesToSend.shift();
  nextMessageSeq += 1;
  transmitIfNecessary();
}
function notifyGame(playerId, players, messageFromTable) {
  onStateChangeHandler({
    playerId: playerId,
    players: players,
    messageFromTable: messageFromTable
  });
}

// Tell the Table the latest version this Hand has accepted. Doubles as the
// sync ping: an unsynced Hand reports 0 until the Table answers with our seq.
function ackTableState() {
  window.parent.postMessage({
    intent: 'tardi.hand.ackTableState',
    matchVersion: highestMatchVersion
  }, '*');
}
function transmitIfNecessary() {
  if (messagesToSend.length === 0) {
    return;
  }
  sendMessageToTable(messagesToSend[0]);
}
function sendMessageToTable(msg) {
  window.parent.postMessage({
    intent: 'tardi.hand.sendMessageToTable',
    handSeq: nextMessageSeq,
    messageFromHand: msg
  }, '*');
}
// EXTERNAL MODULE: ../../node_modules/core-js/modules/es.array.index-of.js
var es_array_index_of = __webpack_require__(4149);
;// ./src/shared/tic-tac-toe-rules.js

// Tic-tac-toe rules, shared by the table and the hand.

var MARKS = ['X', 'O'];
var LINES = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];

// The winning mark ('X' or 'O'), or '' if there is no winner yet.
function winner(board) {
  for (var i = 0; i < LINES.length; i++) {
    var a = LINES[i][0],
      b = LINES[i][1],
      c = LINES[i][2];
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }
  return '';
}
function isDraw(board) {
  return board.indexOf('') === -1;
}
;// ./src/shared/board.js

// A responsive 3x3 board, shared by the (view-only) table and the (interactive)
// hand. Only flexbox + vmin so it renders on old TV browsers (Chromium 38-56):
// no CSS grid, aspect-ratio, or flex gap. Returns an update() function.

var STYLE_ID = 'ttt-style';
var CSS = [':root{font-size:1rem}', '.ttt-wrap{display:flex;flex-direction:column;align-items:center;justify-content:center;', 'height:100%;box-sizing:border-box;padding:3vmin;font-family:Arial,sans-serif}', '.ttt-status{font-size:1.6rem;text-align:center;margin-bottom:2vmin;min-height:6vmin}', '.ttt-grid{display:flex;flex-direction:column;width:80vmin;height:80vmin}', '.ttt-row{display:flex;flex:1}', '.ttt-cell{flex:1;margin:1vmin;border:none;border-radius:2vmin;background:#1e293b;', 'color:#f8fafc;font-family:inherit;font-size:4.5rem;line-height:1;display:flex;', 'align-items:center;justify-content:center;cursor:pointer}', '.ttt-cell:focus{outline:0.2rem solid #38bdf8;outline-offset:0.1rem}', '.ttt-cell:disabled{cursor:default;opacity:0.9}', '.ttt-compact .ttt-status{font-size:1rem}', '.ttt-compact .ttt-cell{font-size:2.5rem}', '.ttt-landscape .ttt-status{font-size:2.7rem}', '.ttt-landscape .ttt-cell{font-size:7.5rem}'].join('');

// Mounts the board into `root`. `onCellTap(index)` fires when a cell is tapped.
// Returns update(board, statusText, interactive): board is 9 strings ('', 'X',
// 'O'); cells are tappable only when interactive and empty.
function mountBoard(root, onCellTap) {
  injectStyle();
  updateOrientation();
  window.addEventListener('resize', updateOrientation);
  var wrap = document.createElement('div');
  wrap.className = 'ttt-wrap';
  var status = document.createElement('div');
  status.className = 'ttt-status';
  status.setAttribute('role', 'status');
  status.setAttribute('aria-live', 'polite');
  wrap.appendChild(status);
  var grid = document.createElement('div');
  grid.className = 'ttt-grid';
  var cells = [];
  for (var r = 0; r < 3; r++) {
    var row = document.createElement('div');
    row.className = 'ttt-row';
    for (var c = 0; c < 3; c++) {
      var cell = makeCell(r * 3 + c, onCellTap);
      cells.push(cell);
      row.appendChild(cell);
    }
    grid.appendChild(row);
  }
  wrap.appendChild(grid);
  root.appendChild(wrap);
  return function update(board, statusText, interactive) {
    status.textContent = statusText;
    for (var i = 0; i < 9; i++) {
      cells[i].textContent = board[i];
      cells[i].setAttribute('aria-label', 'Cell ' + (i + 1) + (board[i] ? ', ' + board[i] : ', empty'));
      cells[i].disabled = !interactive || board[i] !== '';
    }
  };
}
function makeCell(index, onCellTap) {
  var cell = document.createElement('button');
  cell.type = 'button';
  cell.className = 'ttt-cell';
  cell.setAttribute('aria-label', 'Cell ' + (index + 1) + ', empty');
  cell.addEventListener('click', function () {
    onCellTap(index);
  });
  return cell;
}
function updateOrientation() {
  var width = document.documentElement.clientWidth;
  var height = document.documentElement.clientHeight;
  var compact = Math.min(width, height) < 320;
  document.documentElement.classList.toggle('ttt-compact', compact);
  document.documentElement.classList.toggle('ttt-landscape', !compact && width >= height);
}
function injectStyle() {
  if (document.getElementById(STYLE_ID)) return;
  var style = document.createElement('style');
  style.id = STYLE_ID;
  style.textContent = CSS;
  document.head.appendChild(style);
}
;// ./src/hand.js




// The hand is this player's controller. It renders the board and sends the
// tapped cell to the table, which decides what is legal.
var state = null;
var seat = -1;
var update = mountBoard(document.body, onCellTap);
joinMatch({
  onStateChange: onStateChange
});
function onStateChange(envelope) {
  seat = seatOf(envelope.players, envelope.playerId);
  state = envelope.messageFromTable;
  render();
}
function onCellTap(cell) {
  if (!state || state.over) return;
  if (state.turn !== seat) return;
  if (state.board[cell] !== '') return;
  sendToTable(cell);
}
function render() {
  if (!state) {
    update(['', '', '', '', '', '', '', '', ''], 'Waiting for the table...', false);
    return;
  }
  var myTurn = !state.over && state.turn === seat;
  update(state.board, statusText(), myTurn);
}
function statusText() {
  var win = winner(state.board);
  if (win) return win === MARKS[seat] ? 'You win!' : 'You lose';
  if (isDraw(state.board)) return 'Draw';
  return state.turn === seat ? 'Your move (' + MARKS[seat] + ')' : 'Waiting for opponent...';
}
function seatOf(players, playerId) {
  for (var i = 0; i < players.length; i++) {
    if (players[i].playerId === playerId) return i;
  }
  return -1;
}
/******/ })()
;