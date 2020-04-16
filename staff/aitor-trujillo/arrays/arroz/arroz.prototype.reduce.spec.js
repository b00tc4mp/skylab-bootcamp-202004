describe("reduce", function () {
  it("should return myArr to a single element of a sum of all inside", function () {
    var arroz = new Arroz(1, 2, 3, 4);

    var result = arroz.reduce(function (acum, curr) {
      return acum + curr;
    });

    expect(result).toBe(10);
  });
  it("should return myArr to a single element of a sum of all inside", function () {
    var arroz = new Arroz("a", "b", "c", "d");

    var result = arroz.reduce(function (acum, curr) {
      return acum + curr;
    });

    expect(result).toBe("abcd");
  });
  it("should return myArr to a single element of a sum of all inside", function () {
    var arroz = new Arroz(1, 2, 3, 4);

    var result = arroz.reduce(function (acum, curr) {
      return acum + curr;
    });

    expect(result).toBe(10);
  });
});
