"use strict";

describe("Arroz.prototype.every", function () {
  it("It must iterate throw the whole array and return true if all the matches are true", function () {
    var array = new Arroz(1, 2, 3, 5, 6);

    var result = array.every(function (element) {
      return element < 7;
    });

    expect(result).toBe(true);
  });

  it("if one don't match it will return false", function () {
    var array = new Arroz(1, 2, 3, 4);

    var result = array.every(function (element) {
      return element > 8;
    });

    expect(result).toBe(false);
  });

  it("if you pass an empty array it should return an empty array", function () {
    var array = new Arroz("hola", "pepito", "deepclone");

    var result1 = array.every(function (element) {
      return element === "hola";
    });
    var result2 = array.every(function (element) {
      return typeof element === "string";
    });
    expect(result1).toBe(false);
    expect(result2).toBe(true);
  });
});

it("If you dont declare a callback typeError:not a function must alert the user", function () {
  var array = new Arroz(1, 2, 4);

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
