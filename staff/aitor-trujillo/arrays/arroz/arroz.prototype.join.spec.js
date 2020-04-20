"use strict";

describe("Arroz.prototype.join", function () {
  it("should join all items of array into string and return it", function () {
    var myArroz = new Arroz("hello", 1, 2, "world");

    var result = myArroz.join();

    expect(typeof result).toBe("string");
    expect(result.length).toBe(15);
  });
  it("should use the default separator by commas", function () {
    var myArroz = new Arroz("hello", 1, 2, "world");

    var result = myArroz.join();

    expect(result[5]).toBe(",");
  });
  it("should join all items of array into string and return it with separator comma (not the last one)", function () {
    var myArroz = new Arroz("hello", 1, 2, "world");

    var result = myArroz.join(".");

    expect(typeof result).toBe("string");
    expect(result.length).toBe(15);
  });
});
