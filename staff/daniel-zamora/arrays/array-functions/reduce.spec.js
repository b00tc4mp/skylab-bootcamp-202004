"use strict";
describe("reduce", function () {
  it("should calculate total of number", function () {
    var array = [1, 2, 3, 4];

    var total = reduce(array, function (a, actualNumber) {
        return a + actualNumber;
      },1,array );

    expect(total).toBe(9);

  });

 
});
