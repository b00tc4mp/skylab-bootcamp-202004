"use strict";
describe("arroz.prototype.includes", function () {
  it("should find and item in a array if it is finded it will return true, if not it will return false", function () {
    var array = new Arroz(1, 3, 4, 5, 6, 7);
    var result = array.includes(3);
    var result2 = array.includes(8);

    expect(result).toBe(true);
    expect(result2).toBe(false);
  });

  it("If the Start index its negative or 0 it will start at the first item", function () {
    var array = new Arroz(2, 3, 4, 5, 6, 7);

    var result = array.includes(2, 0);
    var result2 = array.includes(2, -8);

    expect(result).toBe(true);
    expect(result2).toBe(true);
  });

  it("If the Start index it will not find in the array and it will return false", function () {
    var array = new Arroz(3, 5, 6, 7, 8);

    var result = array.includes(5, 10);

    expect(result).toBe(false);
  });
  it("includes must be casesensitive", function () {
    var array = new Arroz("hola", "Skylab", "rocks");

    var result = array.includes("skylab");

    expect(result).toBe(false);
  });

  it("If NaN its part of the array it must be finded", function () {
    var array = new Arroz(1, 2, NaN);
    var result = array.includes(NaN);

    expect(result).toBe(true);
  });
});
