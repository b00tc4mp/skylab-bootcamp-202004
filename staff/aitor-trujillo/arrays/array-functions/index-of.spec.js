"use strict";

describe("indexOf", function () {
  it("should return the index 2 of the array", function () {
    var myArray = ["I", "am", "a", "test"];

    var result2 = indexOf(myArray, "test");
    var result1 = indexOf(myArray, "a");
    var result3 = indexOf(myArray, "not in array");

    expect(result1).toBe(2);
    expect(result2).toBe(3);
    expect(result3).toBe(-1);
  });
  it("should return the index 2 of the array", function () {
    var myArray = ["I", "am", "a", "test", "of", "indexOf", "am"];

    var result1 = indexOf(myArray, "a");
    var result2 = indexOf(myArray, "a", 3);

    expect(result1).toBe(2);
    expect(result2).toBe(-1);
  });
});
