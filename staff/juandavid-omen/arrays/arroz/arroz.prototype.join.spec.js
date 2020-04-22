"use strict";

describe("Arroz.prototype.join", function() {
  it("if create an Arroz of strings, it should return a single string including the subelements of the Arroz separated by commas", function() {
    var array = new Arroz('a', 'b', 'c');
    
    var result = array.join();

    expect(result).toBe('a,b,c');
  });

  it("if create an Arroz of numbers, it should return a single string including the subelements of the Arroz separated by commas", function() {
    var array = new Arroz(1, 1, 1);

    var result = array.join();

    expect(result).toBe("1,1,1");
  });

  it("if a separator is provided, the elements should be separated by that separator", function() {
    var array = new Arroz(1, 1, 1);

    var result = array.join("helloworld");

    expect(result).toBe("1helloworld1helloworld1");
  });

  it("if an Arroz containing undefined is introduced, the undefined element should be skipped", function() {
    var array = new Arroz(5, true, undefined);

    var result = array.join();

    expect(result).toBe("5,true,");
  });

  it("if an Arroz containing an array is introduced, the array should be skipped", function() {
    var array = new Arroz(5, true, []);

    var result = array.join();

    expect(result).toBe("5,true,");
  });

  it("if an Arroz containing a non-array object is introduced, a specific string will be returned", function() {
    var array = new Arroz(5, true, {});

    var result = array.join();

    expect(result).toBe("5,true,[object Object]");
  });

  it("if an Arroz containing a function object is introduced, a specific string will be returned", function() {
    var func = function hello(){};
    var array = new Arroz(5, true, func);

    var result = array.join();

    expect(result).toBe("5,true,function hello(){}");
  });

  it("throw an error when the separator is not a string", function () {
    var array = new Arroz(5, 7, 8);

    expect(function () { 
      array.join(1);
     }).toThrowError(TypeError, '1 is not a string');
  });
});
