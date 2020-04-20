"use strict";

describe("Arroz", function () {
  it("should instanciate an Arroz with length 0 on no arguments", function () {
    var array = new Arroz();

    expect(array instanceof Arroz).toBeTruthy();
    expect(array.length).toBe(0);
  });

  it("should instanciate an Arroz with length 3 on 1,2,3 arguments", function () {
    var array = new Arroz(1, 2, 3);

    expect(array instanceof Arroz).toBeTruthy();
    expect(array.length).toBe(3);
  });
  it("should throw an error if there is only one number argument not whole", function () {
    expect(function () {
      var array = new Arroz(12.5);
    }).toThrowError(RangeError, "Invalid arroz length");
  });
});
