"use strict";

describe("Arroz.prototype.includes", function () {
  it("should return true if finds the string in the Arroz myArr", function () {
    var myArr = new Arroz("I", "am", "pretty");

    var result = myArr.includes("pretty");

    expect(result).toBe(true);
  });
  it("should return false if doesn't find the string in the Arroz myArr", function () {
    var myArr = new Arroz("I", "am", "pretty");

    var result = myArr.includes("ugly");

    expect(result).toBe(false);
  });
  it("should return false if doesn't find the string in the Arroz myArr starting on index = 1", function () {
    var myArr = new Arroz("I", "am", "pretty");

    var result = myArr.includes("I", 1);

    expect(result).toBe(false);
  });
});
