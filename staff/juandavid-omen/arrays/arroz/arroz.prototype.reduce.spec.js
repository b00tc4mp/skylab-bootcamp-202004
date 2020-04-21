"use strict";

describe("Arroz.prototype.reduce", function() {
  it("should return the sum of all the elements", function() {
    var array = new Arroz(1, 2, 3);

    var result = array.reduce(function(accumulator, element) {
      return accumulator + element;
    });

    expect(result).toBe(6);
  });

  it("should return the product of all the elements", function() {
    var array = new Arroz(1, 2, 3);

    var result = array.reduce(function(accumulator, element) {
      return accumulator * element;
    });

    expect(result).toBe(6);
  });

  it("if an initial value is provided, the operation will start at that index", function() {
    var array = new Arroz(1, 2, 3);

    var result = array.reduce(function(accumulator, element) {
        return accumulator + element;
      }, 1
    );

    expect(result).toBe(5);
  });

  it("if an initial value is provided and it is higher than array.length, the operation will return undefined", function() {
    var array = new Arroz(1, 2, 3);

    var result = array.reduce(function(accumulator, element) {
        return accumulator + element;
      }, 3
    );

    expect(result).toBe(undefined);
  });

  it('Arroz.prototype.reduce() Errors', function () {
    var array = new Arroz();
    
    expect(function () {
      array.reduce(function (accumulator, element) {
        return accumulator + element;
      });
    }).toThrowError(TypeError, 'Arroz has not values to do reduce');

    var array = new Arroz(1, 2, 3);
    
    expect(function () {
      array.reduce();
    }).toThrowError(TypeError, 'undefined is not a function');

    var array = new Arroz(1, 2, 3);

    expect(function () {
      array.reduce('hello');
    }).toThrowError(TypeError, 'hello is not a function');
  });
});