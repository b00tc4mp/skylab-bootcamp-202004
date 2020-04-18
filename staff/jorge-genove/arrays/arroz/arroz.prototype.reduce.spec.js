"use strict";

describe("arroz.prototype.reduce", function () {
  it("Should operate trouth all the array returnig a single value", function () {
    var array = new Arroz(1, 2, 3, 4, 5, 6);
    var result = array.reduce(function (accumulator, element) {
      return accumulator + element;
    });
    expect(result).toBe(21);

    var array = new Arroz(1, 2, 3, 4, 5);
    var result = array.reduce(function (accumulator, element) {
      return accumulator * element;
    });
    expect(result).toBe(120);
  });
  it("If you apply an empty array and the initial value is different than undefined, it will return the initial value", function () {
    var array = new Arroz();
    var result = array.reduce(function (accumulator, element) {
      return accumulator + element;
    }, 2);
    expect(result).toBe(2);
  });
  it("If you apply an empty array and no initial Value it will throw a TypeError", function () {
    var array = new Arroz();

    expect(function () {
      array.reduce(function(accumulator, element){
          return accumulator + element;
      });
    }).toThrowError(TypeError, 'reduce of empty array with no initial value');
  });
  it("If you not pass a function a type error will be throw", function () {
    var array = new Arroz(1, 2, 3, 4);

    expect(function () {
      array.every();
    }).toThrowError(TypeError, "undefined is not a function");
    expect(function () {
      array.every(1);
    }).toThrowError(TypeError, "1 is not a function");
    expect(function () {
      array.every(false);
    }).toThrowError(TypeError, "false is not a function");
  });
});
