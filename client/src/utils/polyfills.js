export default (() => {
  // https://tc39.github.io/ecma262/#sec-array.prototype.find
  if (!Array.prototype.find) {
    /* eslint-disable */
    Object.defineProperty(Array.prototype, 'find', {
      value: (predicate) => {
        // 1. Let O be ? ToObject(this value).
        if (this == null) {
          throw new TypeError('"this" is null or not defined');
        }

        const o = Object(this);

        // 2. Let len be ? ToLength(? Get(O, "length")).
        const len = o.length >>> 0;

        // 3. If IsCallable(predicate) is false, throw a TypeError exception.
        if (typeof predicate !== 'function') {
          throw new TypeError('predicate must be a function');
        }

        // 4. If thisArg was supplied, let T be thisArg; else let T be undefined.
        const thisArg = arguments[1];

        // 5. Let k be 0.
        let k = 0;

        // 6. Repeat, while k < len
        while (k < len) {
          // a. Let Pk be ! ToString(k).
          // b. Let kValue be ? Get(O, Pk).
          // c. Let testResult be ToBoolean(? Call(predicate, T, « kValue, k, O »)).
          // d. If testResult is true, return kValue.
          const kValue = o[k];
          if (predicate.call(thisArg, kValue, k, o)) {
            return kValue;
          }
          // e. Increase k by 1.
          k++;
        }

        // 7. Return undefined.
        return undefined;
      }
    });
  }

  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries
  if (!Object.entries)
    Object.entries = function (obj) {
      var ownProps = Object.keys(obj),
        i = ownProps.length,
        resArray = new Array(i); // preallocate the Array
      while (i--)
        resArray[i] = [ownProps[i], obj[ownProps[i]]];

      return resArray;
    };

  // https://blogs.msdn.microsoft.com/ie/2010/09/07/transitioning-existing-code-to-the-es5-gettersetter-apis/
  if (!Object.prototype.__defineGetter__ &&
    Object.defineProperty({}, "x", { get: function () { return true } }).x) {
    Object.defineProperty(Object.prototype, "__defineGetter__",
      {
        enumerable: false, configurable: true,
        value: function (name, func) {
          Object.defineProperty(this, name,
            { get: func, enumerable: true, configurable: true });
        }
      });
    Object.defineProperty(Object.prototype, "__defineSetter__",
      {
        enumerable: false, configurable: true,
        value: function (name, func) {
          Object.defineProperty(this, name,
            { set: func, enumerable: true, configurable: true });
        }
      });
  }
})();