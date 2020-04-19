"use strict";

describe("Arroz.prototype.indexOf", function () {
  it("should return the index 2 of the array", function () {
    var myArroz = new Arroz("I", "am", "a", "test");

    var result1 = myArroz.indexOf("a");
    var result2 = myArroz.indexOf("test");
    var result3 = myArroz.indexOf("not in array");

    expect(result1).toBe(2);
    expect(result2).toBe(3);
    expect(result3).toBe(-1);
  });
  it("should return the index 2 of the array", function () {
    var myArroz = new Arroz("I", "am", "a", "test", "of", "indexOf");

    var result1 = myArroz.indexOf("a", 1);
    var result2 = myArroz.indexOf("a", 3);

    expect(result1).toBe(2);
    expect(result2).toBe(-1);
  });
});
