"use strict";

describe("Arroz.prototype.find", function () {
  it("It must iterate and array and return the first match value", function () {
    var array = new Arroz(12, 15, 8, 5, 6);

    var result = array.find(function (element) {
      return element < 9;
    });

    expect(result).toBe(8);
  });

  it("if no matches nothing it will return undefined", function () {
    var array = new Arroz(1, 2, 3, 4);

    var result = array.find(function (element) {
      return element > 8;
    });

    expect(result).toBe(undefined);
  });

  it("The find() method returns the value of the first element in the provided array that satisfies the provided testing function", function () {
    var array = new Arroz("hola", "que", "Sergio", "Jordi");

    var result1 = array.find(function (element) {
      return element.length < 5;
    });
    var result2 = array.find(function (element) {
      return element.length > 10;
    });
    expect(result1).toBe("hola");
    expect(result2).toBe(undefined);
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
});
