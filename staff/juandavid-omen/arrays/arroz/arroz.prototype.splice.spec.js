"use strict";

describe("Arroz.prototype.splice", function() {
  it(" insert elements without removing elements from array", function() {
    var array= new Arroz(1, 2, 4, 5, 6, 7);
    
    array.splice(2, 0, 3);

    expect(array[2]).toBe(3);
    expect(array[3]).toBe(4);
    expect(array.length).toBe(7);
  });

  it("Insert elements y remove elements from the array", function() {
    var array = new Arroz(1, 2, 4, 5, 6, 7);

    array.splice(2, 2);

    expect(array[2]).toBe(6);
    expect(array[3]).toBe(7);
    expect(array.length).toBe(4);
  });

  it("if the start is negative, start = array.length-(start in absolute value)", function() {
    var array = new Arroz(1, 2, 4, 5, 6, 7);

    array.splice(-1, 1);

    expect(array[4]).toBe(6);
    expect(array.length).toBe(5);
  });

  it("with negative starting point, the function can still add elements to the array", function() {
    var array = new Arroz(1, 2, 4, 5, 6, 7);

    array.splice(-1, 1, 7);

    expect(array[5]).toBe(7);
    expect(array.length).toBe(6);
  });

  it("if no deleteCount is introduced, all elements after the start point are deleted", function() {
    var array = new Arroz(1, 2, 4, 5, 6, 7);

    array.splice(2);

    expect(array[1]).toBe(2);
    expect(array.length).toBe(2);
  });

  it("adds the element to the end if start is higher than the length of the array", function() {
    var array = new Arroz(1, 2, 4, 5, 6, 7);

    array.splice(7, 0, 8);

    expect(array[6]).toBe(8);
    expect(array.length).toBe(7);
  });

  it("add any amount of elements introduced in the function after array, start and end", function() {
    var array = new Arroz(1, 2, 4, 5, 6, 7);
    array.splice(3, 0, 2, 5, 6, 7, 8);
    expect(array.length).toBe(11);
  });

  it("if deleteCount is negative, deleteCount becomes 0", function() {
    var array = new Arroz(1, 2, 4, 5, 6, 7);
    array.splice(3, -3);
    expect(array.length).toBe(6);
  });


  it("if start is not a number, throw an error", function () {
    var array = new Arroz(1, 2, 4, 5, 6, 7);
 
     expect(function () {
      array.splice(true, -3);
    }).toThrowError(TypeError, 'true must be numeric');
  });

  it("if deleteCount is not a number, throw an error", function () {
    var array = new Arroz(1, 2, 4, 5, 6, 7);

    expect(function () { 
      array.splice(3, 'hello');
    }).toThrowError(TypeError, 'hello must be numeric');
  });

});
