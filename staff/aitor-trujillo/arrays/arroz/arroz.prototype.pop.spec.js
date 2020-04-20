"use strict";

describe("Arroz.prototype.pop", function () {
  it("should delete the last number of array", function () {
    var arroz = new Arroz(1, 2, 3);

    arroz.pop();

    expect(arroz[1]).toBe(2);
    expect(arroz[2]).toBe(undefined);
  });
  it("should return the deleted item", function () {
    var arroz = new Arroz(1, 2, 3);

    var deleted = arroz.pop();

    expect(deleted).toBe(3);
  });
  it("should change the length of the array", function () {
    var arroz = new Arroz(1, 2, 3);

    arroz.pop();

    expect(arroz.length).toBe(2);
  });
});
