var typecast = require('../');
var assert = require('assert');

describe('.string()', function () {
  it('should return a string', function () {
    assert(typecast.string(2) === '2');
    assert(typeof typecast.string({}) == 'string');
  })

  it('should return an empty string when given a null-ish value', function () {
    assert(typecast.string(null) === '');
    assert(typecast.string(undefined) === '');
  })
})

describe('.number()', function () {
  it('should return a number', function () {
    assert(typecast.number('123') === 123);
  })

  it('should return 0 if typecasting fails', function () {
    assert(typecast.number('abc') === 0);
  })

  it('should return an 0 when given a null-ish value', function () {
    assert(typecast.number(null) === 0);
    assert(typecast.number(undefined) === 0);
  })
})

describe('.date()', function () {
  it('should return a date', function () {
    assert(typecast.date('2010 10 01').valueOf() === 1285905600000);
  })

  it('should return default date if typecasting fails', function () {
    assert(typecast.date('abc') instanceof Date);
    assert(typecast.date('abc').valueOf() == 0);
  })

  it('should return default date when given a null-ish value', function () {
    assert(typecast.date(null) instanceof Date);
    assert(typecast.date(null).valueOf() == 0);

    assert(typecast.date(undefined) instanceof Date);
    assert(typecast.date(undefined).valueOf() == 0);
  })
})

describe('.array()', function () {
  it('should return an array', function () {
    var arr = [1, 2, 3];
    assert(typecast.array(arr) === arr);
    assert(typecast.array(1) instanceof Array);
    assert(typecast.array('a, b, c').length == 3);
    assert(typecast.array('a, b, c')[1] === 'b');
  })

  it('should preserve non-string objects', function () {
    var now = new Date();
    assert(Array.isArray(typecast.array(now)));
    assert(typecast.array(now).length == 1);
    assert(typecast.array(now)[0] === now);
  });

  it('should return an empty array when given a null-ish value', function () {
    assert(Array.isArray(typecast.array(null)));
    assert(typecast.array(null).length == 0);

    assert(Array.isArray(typecast.array(undefined)));
    assert(typecast.array(undefined).length == 0);
  })
})

describe('.boolean()', function () {
  it('should return a boolean', function () {
    assert(typecast.boolean('abc') === true);
    assert(typecast.boolean(0) === false);
    assert(typecast.boolean('0') === false);
    assert(typecast.boolean('false') === false);
  })
})

describe('.object()', function () {
  it('should return an object', function () {
	  var obj = {x: 1, y: 2, z: 3};
	  assert(typecast.object(obj) === obj);
	  assert(typecast.object(1) instanceof Object);
	  assert(Object.entries(typecast.object('{"x": 1, "y": 2, "z": 3}')).length == 3);
	  assert(typecast.object('{"x": 1, "y": 2, "z": 3}').z === 3);
  })
  
  it('should preserve non-string objects', function () {
	  var now = new Date();
	  assert(typeof typecast.object(now) === 'object');
	  assert(Object.entries(typecast.object(now)).length == 0);
	  assert(typeof typecast.object(now).getTime === 'function');
  });
  
  it('should return an empty object when given a null-ish value', function () {
	  assert(typeof typecast.object(null) == 'object');
	  assert(Object.entries(typecast.object(null)).length == 0);
  
	  assert(typeof typecast.object(undefined) == 'object');
	  assert(Object.entries(typecast.object(undefined)).length == 0);
  })
  
  it('should return parsed JSON object when given valid JSON', function () {
    const validJSON = '{"x": 1, "y": 2, "z": 3}'
    assert(typeof typecast.object(validJSON) == 'object');
    assert(Object.entries(typecast.object(validJSON)).length == 3);
	  assert(typecast.object(validJSON).z === 3);
  })
  
  it('should return value as property when given non-JSON string or other primitive', function () {
    const invalidJSON = 'x: 1, y: 2, z: 3'
    assert(typeof typecast.object(invalidJSON) == 'object');
    assert(Object.entries(typecast.object(invalidJSON)).length == 1);
	  assert(typecast.object(invalidJSON).value === 'x: 1, y: 2, z: 3');
	  assert(typecast.object(1).value === 1);
  })
})

describe('typecast()', function () {
  it('should work', function () {
    assert(typecast(123, 'string') === '123');
  });

  it('should throw when given an invalid type', function () {
    var err;
    try {
      typecast(1, 'invalid');
    } catch (e) {
      err = e;
    }
    assert(err);
  });
});
