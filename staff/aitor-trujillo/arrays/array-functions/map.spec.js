"use strict";

describe("map", function () {
  it("should return each element of array doubled", function () {
    var arr = [1, 2, 3, 4];

    var double = map(arr, function (x) {
      return x * 2;
    });

    expect(double[0]).toBe(2);
    expect(double[1]).toBe(4);
  });
  it("should return each element of array doubled", function () {
    var arr = [1, 2, 3, 4];

    var double = map(arr, function (x) {
      return x * 2;
    });

    expect(double[0]).toBe(2);
    expect(double[1]).toBe(4);
  });
});
