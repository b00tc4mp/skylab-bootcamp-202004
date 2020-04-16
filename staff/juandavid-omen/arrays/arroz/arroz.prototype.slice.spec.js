"use strict";

describe("Arroz.prototype.slice", function() {
  it("should return and empty Arroz when the begin param is higher than the index range", function() {
    var array = new Arroz(5, 12, 8, 130, 44);
    var result = array.slice(6, 10);

    expect(result.length).toBe(0);
  });

    it("extract the subsequence of an Arroz from index 0 to the parameter end", function() {
    var array = new Arroz(5, 12, 8, 130, 44);
    var result = array.slice(2);

    expect(result[0]).toBe(5);
    expect(result[1]).toBe(12);
    expect(result.length).toBe(2);
  });

  it("extract the subsequence of an Arroz from the parameter begin to the parameter end", function() {
    var array = new Arroz(5, 12, 8, 130, 44);
    var result = array.slice(1, 3);

    expect(result[0]).toBe(12);
    expect(result[1]).toBe(8);
    expect(result.length).toBe(2);
  });
});




