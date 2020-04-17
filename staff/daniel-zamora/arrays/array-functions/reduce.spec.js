"use strict";
describe("reduce", function () {
  it("should calculate the addition of all number from array starting from the begining", function () {
    var array = [1, 2, 3, 4];

    var total = reduce(array,function (arrayNumber, actualNumber) {
        return arrayNumber + actualNumber;
      },0,array);

      expect(total).toBe(10);
  });

  it("should calculate the multiplication of the the elements of the array itself, starting from position 2", function () {
    var array = [1, 2, 3, 4,5,6,7];

    var total = reduce(array,function (arrayNumber, actualNumber) {
        return arrayNumber * actualNumber;
      },2, array );

      expect(total).toBe(2520);


});

});
