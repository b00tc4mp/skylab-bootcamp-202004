"use strict";

describe("Arroz.prototype.map", function() {
  it("should iterate on each element and keep each value multiplied by 10 in a new external array", function() {
    var array = new Arroz(1, 2, 3);

    var result = array.map(function(element) {
      return element * 10;
    });

    expect(result[0]).toBe(10);
    expect(result[1]).toBe(20);
    expect(result[2]).toBe(30);
  });

  it("should iterate on each element and keep each value in upper-case in a new external array", function() {
    var array = new Arroz("hello", "cruel", "world");

    var result = array.map(function(element) {
      return element.toUpperCase();
    });

    expect(result[0]).toBe("HELLO");
    expect(result[1]).toBe("CRUEL");
    expect(result[2]).toBe("WORLD");
  });

  it("should iterate on each element provide the index from the second argument of the expression (callback)", function() {
    var array = new Arroz(1, 2, 3);
    
    var result = array.map(function(element, index, array) {
      return index;
    });

    expect(result[0]).toBe(0);
    expect(result[1]).toBe(1);
    expect(result[2]).toBe(2);
  });

  it("should iterate on each element provide the full array from the third argument of the expression (callback)", function() {
    var array = new Arroz(1, 2, 3);

    var result = array.map(function(element, index, array) {
      return array;
    });

    expect(result[0]).toBe(array);
    expect(result[1]).toBe(array);
    expect(result[2]).toBe(array);
  });

  it("should throw an error when the parameter callback is not a function", function () {
    var array = new Arroz(1, 2, 3);

    expect(function() {
      array.map(true);
    }).toThrowError(TypeError, 'true is not a function');

    expect(function () {
      array.map(123);
    }).toThrowError(TypeError, '123 is not a function');

  });
  
});
