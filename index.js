module.exports = typecast;

/**
 * Cast given `val` to `type`
 *
 * @param {Mixed} val
 * @param {String} type
 * @api public
 */

function typecast (val, type) {
  var fn = typecast[type];
  if (typeof fn != 'function') throw new Error('cannot cast to ' + type);
  return fn(val);
}

/**
 * Cast `val` to `String`
 *
 * @param {Mixed} val
 * @api public
 */

typecast.string = function (val) {
  if (null == val) return '';
  return val.toString();
};

/**
 * Cast `val` to `Number`
 *
 * @param {Mixed} val
 * @api public
 */

typecast.number = function (val) {
  var num = parseFloat(val);
  return isNaN(num)
    ? 0
    : num;
};

/**
 * Cast `val` to a`Date`
 *
 * @param {Mixed} val
 * @api public
 */

typecast.date = function (val) {
  var date = new Date(val);
  return isNaN(date.valueOf())
    ? new Date(0)
    : date;
};

/**
 * Cast `val` to `Array`
 *
 * @param {Mixed} val
 * @api public
 */

typecast.array = function (val) {
  if (val == null) return [];
  if (val instanceof Array) return val;
  if (typeof val != 'string') return [val];

  var arr = val.split(',');
  for (var i = 0; i < arr.length; i++) {
    arr[i] = arr[i].trim();
  }

  return arr;
};

/**
 * Cast `val` to `Boolean`
 *
 * @param {Mixed} val
 * @api public
 */

typecast.boolean = function (val) {
  return !! val && val !== 'false' && val !== '0';
};

/**
 * Cast `val` to `Object`
 *
 * @param {Mixed} val
 * @api public
 */
typecast.object = function(val) {
  if (val == null) return {};
  if (Array.isArray(val)) return Object.assign({}, val);
  if (val instanceof Object) return val;
  if (typeof val !== 'string') return { value: val };
  let obj = {};
  try {
	  obj = JSON.parse(val);
  } catch (error) {
	  obj = { value: val };
  }
  return obj;
};
