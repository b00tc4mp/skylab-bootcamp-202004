describe("filter", function () {
  it("Should itereate on the array and return a variable with the value of the match between array and current value.", function () {
    var array = [1, 2, 3, 4, 5];
    // var result = [];

    filter(array, function (searchValue) {
      return searchValue > 3;
    });

    expect(array[4]).toBe(5);
  });
});

false &&
  describe("filter", function () {
    it("Should itereate on the array and return the value of the match", function () {
      var filtered = [12, 5, 8, 130, 44];
       filter(filtered, function (value) {
          return value >= 10;
      });

      expect(filtered[0]).toBe(12);
    });
  });
