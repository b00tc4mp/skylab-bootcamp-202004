"use strict";

describe("filter", function () {
  it("should filter in new array result biggers than 10", function () {
    var arr = [0, 5, 10, 15, 20];

    var result = filter(arr, function (x) {
      return x > 10;
    });

    expect(result[0]).toBe(15);
    expect(result.length).toBe(2);
  });
});
