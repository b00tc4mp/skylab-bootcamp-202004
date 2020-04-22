"use strict";

describe("Arroz.prototype.includes", function() {
  it("returns true if the element is found within the array called upon", function() {
    var array = new Arroz(2, 9, 9);

    var result = array.includes(9);

    expect(result).toBe(true);
  });

  it("if an index is provided, the count starts at the index", function() {
    var array = new Arroz(2, 9, 9);

    var result = array.includes(9, 2);

    expect(result).toBe(true);
  });

  it("if index is equal or higher than the length of the array, returns false", function() {
    var array = new Arroz(2, 9, 9);

    var result = array.includes(9, 3);

    expect(result).toBe(false);
  });

  it("if element is not found in the array, returns false", function() {
    var array = new Arroz(2, 9, 9);

    var result = array.includes(5);

    expect(result).toBe(false);
  });

  it("if index is negative, the search starts at the last position of the array minus the absolute value of index", function() {
    var array = new Arroz(2, 9, 9);

    var result = array.includes(9, -1);

    expect(result).toBe(true);
  });

  it("if index is negative and its absolute value is equal or higher than the length of the array, returns false", function() {
    var array = new Arroz(2, 9, 9);

    var result = array.includes(9, -3);

    expect(result).toBe(false); 
  });

  it("throw an error when index is not numeric", function () {
    var array = new Arroz(2, 9, 9);

    expect(function() {
      array.includes(2, true);
    }).toThrowError(TypeError, 'true must be a number');
  });
});