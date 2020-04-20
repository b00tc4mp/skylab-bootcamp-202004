"use strict";

describe("join", function () {
  it("should join all items of array into string and return it", function () {
    var myArr = ["hello", 1, 2, "world"];

    var result = join(myArr);

    expect(typeof result).toBe("string");
    expect(result.length).toBe(15);
  });
  it("should join all items of array into string and return it with separator comma (not the last one)", function () {
    var myArr = ["hello", 1, 2, "world"];

    var result = join(myArr, ".");

    expect(typeof result).toBe("string");
    expect(result.length).toBe(15);
  });
});
