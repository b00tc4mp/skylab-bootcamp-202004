"use strict";

describe("filter", function () {
  it("should filter in new array result biggers than 10", function () {
    var arroz = new Arroz(0, 5, 10, 15, 20);

    var result = arroz.filter(function (x) {
      return x > 10;
    });

    expect(result[0]).toBe(15);
    expect(result.length).toBe(2);
  });
  it("should throw an error if filter has no callback inside", function () {
    var arroz = new Arroz(0, 5, 10, 15, 20);

    try {
      var result = arroz.filter();
    } catch (error) {
      result = error;
    }

    expect(result instanceof Error).toBeTruthy();
  });
  it("should return an empty Arroz if any element passes the filter", function () {
    var arroz = new Arroz(0, 5, 10, 15, 20);

    var result = arroz.filter(function (x) {
      return x > 50;
    });

    expect(result.length).toBe(0);
    expect(result instanceof Arroz).toBeTruthy();
  });
});
