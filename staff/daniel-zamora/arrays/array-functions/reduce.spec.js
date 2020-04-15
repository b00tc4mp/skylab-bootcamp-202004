"use strict";
describe("reduce", function () {
<<<<<<< Updated upstream
  it("should calculate total of number", function () {
    var array = [1, 2, 3, 4];

    var total = reduce(array, function (a, actualNumber) {
        return a + actualNumber;
=======
  it("should calculate the addition of all number from array starting from the begining", function () {
    var array = [1, 2, 3, 4];

    var total = reduce(array, function (arrayNumber, actualNumber) {
        return arrayNumber + actualNumber;
>>>>>>> Stashed changes
      },1,array );

    expect(total).toBe(9);

  });

 
});
