"use strict";

describe("Arroz.prototype.filter", function() {
  it("should return an empty array when the filtered array is empty", function() {
    var array = new Arroz();

    var result = array.filter(function(word) {
      return word.length > 6;
    });

    expect(result.length).toBe(0);
  });

  it("should return the values of an array than meet a condition", function() {
    var array = new Arroz("spray", "limit", "elite", "exuberant","destruction", "present");
    
    var result = array.filter(function(word) {
      return word.length > 6;
    });

    expect(result[0]).toBe('exuberant');
    expect(result[1]).toBe('destruction');
    expect(result[2]).toBe('present');
  });

  it("should throw an error if the expression is not a function", function () {
    var array = new Arroz("spray", "destruction", "present");

    expect(function(){
      array.filter('Hello')
    }).toThrowError(TypeError, 'Hello is not a function');
  });
});
