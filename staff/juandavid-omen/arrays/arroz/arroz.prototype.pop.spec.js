"use strict";

describe("Arroz.prototype.pop", function() {
  it("should return the deleted element from an array", function() {
    var array = new Arroz("world", "hello world");

    var deletedValue = array.pop();

    expect(deletedValue).toBe("hello world");
  });

  it("should remove the last element from an array. This method changes the length of the array.", function() {
    var array = new Arroz("hello", "cruel", "world");
    array.pop();

    expect(array[0]).toBe("hello");
    expect(array[1]).toBe("cruel");
    expect(array.length).toBe(2);
  });

  it("should throw an error when the Arroz is empty", function () {
    var array = new Arroz();

    expect(function () { 
      array.pop();
     }).toThrowError(RangeError, 'you cannot delete elements from an empty Arroz');
  });
});
