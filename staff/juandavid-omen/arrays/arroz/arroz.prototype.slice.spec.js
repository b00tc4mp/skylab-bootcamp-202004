"use strict";

describe("Arroz.prototype.slice", function() {
  it("should throw an error when the begin param is higher than the index range", function() {
    var array = new Arroz(5, 12, 8, 130, 44);
    
    expect(function() {
      array.slice(6, 10);
    }).toThrowError(RangeError, "6 is higher than the index range")
    
  });

  it("should throw an error when the end param is higher than the index range", function () {
    var array = new Arroz(5, 12, 8, 130, 44);

    expect(function () {
      array.slice(1, 10);
    }).toThrowError(RangeError, "10 is higher than the index range")

  });

    it("extract the subsequence of an Arroz from index 0 to the parameter end", function() {
    var array = new Arroz(5, 12, 8, 130, 44);
    var result = array.slice(2);

    expect(result[0]).toBe(5);
    expect(result[1]).toBe(12);
    expect(result.length).toBe(2);
  });

  it("extract the subsequence of an Arroz from the parameter begin to the parameter end", function() {
    var array = new Arroz(5, 12, 8, 130, 44);
    var result = array.slice(1, 3);

    expect(result[0]).toBe(12);
    expect(result[1]).toBe(8);
    expect(result.length).toBe(2);
  });
});




