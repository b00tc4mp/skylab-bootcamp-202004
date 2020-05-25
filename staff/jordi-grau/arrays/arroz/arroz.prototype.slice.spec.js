'use strict'

describe("arroz.prototype.slice", function () {
  it("Should return a part of the original array into a new array, from the specificated start and end podistions(end position not included)", function () {
    var array1 = new Arroz(1, 2, 3, 4, 5, 6, 7);

    var result1 = array1.slice(2, 5);

    var result2 = array1.slice( -4, 6);

    var result3 = array1.slice( 2, -2);

    expect(result1[0]).toBe(3);
    expect(result1[1]).toBe(4);
    expect(result2[0]).toBe(4);
    expect(result2[1]).toBe(5);
    expect(result3[0]).toBe(3);
    expect(result3[1]).toBe(4);
  });
});
