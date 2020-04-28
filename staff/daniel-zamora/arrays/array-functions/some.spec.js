"use strict";
describe("some", function () {
  it("should find the first element matched with the search value", function () {
    var array = [1, 2, 3, 4];

    var result = some(array, function (searchValue) {
        return searchValue > 3;
      },1,array );

    expect(result).toBe(true);

  });
  describe("some", function () {
    it("should find the same element matched with the search value", function () {
      var array = [1, 2, 3, 4];
  
      var result = some(array, function (searchValue) {
          return searchValue === 10;
        },0,array );
  
      expect(result).toBe(false);
    });
 
});

});
