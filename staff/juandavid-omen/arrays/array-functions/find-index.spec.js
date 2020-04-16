describe("The find-index method", function () {
  it("returns the index of the first element in the provided array that satisfies the provided testing function", function () {
    var array = [5, 12, 8, 130, 44];

    var result = findIndex(array, function (element) {
      return element > 10;
    });

    expect(result).toBe(1);
  });

  it("returns -1 if no elements in the provided array satisfy the provided testing function", function () {
    var array = [5, 12, 8, 130, 44];

    var result = findIndex(array, function (element) {
      element > 200;
    });

    expect(result).toBe(-1);
  });

  it("returns -1 if the length of the array is 0", function () {
    var array = [];
    
    var result = findIndex(array, function (element) {
      element > 0;
    });

    expect(result).toBe(-1);
  });
});
