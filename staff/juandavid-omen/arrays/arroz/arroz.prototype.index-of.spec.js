"use strict";

describe("Arroz.prototype.index-of", function() {
  it("returns the first position where the element is found within the array called upon", function() {
    var array = new Arroz(2, 9, 9);

    var result = array.indexOf(9);

    expect(result).toBe(1);
  });

  it("if an index is provided, the count starts at the index", function() {
    var array = new Arroz(2, 9, 9);

    var result = array.indexOf(9, 2);

    expect(result).toBe(2);
  });

  it("if index is equal or higher than the length of the array, returns -1", function() {
    var array = new Arroz(2, 9, 9);

    var result = array.indexOf(9, 3);

    expect(result).toBe(-1);
  });
  
  it("if element is not found in the array, returns -1", function() {
    var array = new Arroz(2, 9, 9);

    var result = array.indexOf(5);

    expect(result).toBe(-1);
  });

  it("throw an error when index is not numeric", function () {
    var array = new Arroz(2, 9, 9);

    expect(function () { 
      array.indexOf(5, false);
     }).toThrowError(TypeError, 'false must be numeric');
  });
});