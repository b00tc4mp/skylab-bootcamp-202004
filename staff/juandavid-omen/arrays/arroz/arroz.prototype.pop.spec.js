"use strict";

describe("Arroz.prototype.pop", function() {
  it("should return undefined when the array is empty", function() {
    var array = new Arroz();

    var deletedValue = array.pop();

    expect(deletedValue).toBe(undefined);
  });

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
});
