"use strict";

describe("Arroz.prototype.slice", function () {
  it("should cut at start index up to end index of array", function () {
    var fruits = new Arroz("Banana", "Orange", "Lemon", "Apple", "Mango");

    var citrus = fruits.slice(1, 3);

    expect(citrus[0]).toBe("Orange");
    expect(citrus[3]).toBe(undefined);
  });
});
