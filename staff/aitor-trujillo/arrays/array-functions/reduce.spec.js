"use strict";

describe("reduce", function () {
  it("should return myArr to a single element of a sum of all inside", function () {
    var myArr = [1, 2, 3, 4];

    var result = reduce(myArr, function (x, y) {
      return x + y;
    });

    expect(result).toBe(10);
  });
});
