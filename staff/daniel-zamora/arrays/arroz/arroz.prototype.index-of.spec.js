describe("Arroz.prototype.index-of", function () {
  it("Shoould find the index of the first match with the array", function () {
    var array = new Arroz(1, 2, 3);

    var matchIndex = array.indexOf(2);

    expect(matchIndex).toBe(1);
  });

  it("Shoould find the index of the first match in the array starting from position 2", function () {
    var array = new Arroz(1, 2, 3, 4, 5, 6, 7, 8);

    var matchIndex = array.indexOf(6, 2);

    expect(matchIndex).toBe(5);
  });

  it("Shoould find the index of the first match in the array starting from position -4", function () {
    var array = new Arroz(1, 2, 3, 4, 5, 6, 7, 8);

    var matchIndex = array.indexOf(5, -1);

    expect(matchIndex).toBe(-1);
  });

  it("Shoould return -1, because doesn't match any result with the array", function () {
    var array = new Arroz(1, 2, 3, 4, 5, 6, 7, 8);

    var matchIndex = array.indexOf(9);

    expect(matchIndex).toBe(-1);
  });

  it("Shoould return -1, because the position required is bigger than the length of the array", function () {
    var array = new Arroz(1, 2, 3, 4, 5, 6, 7, 8);

    var matchIndex = array.indexOf(4, 9);

    expect(matchIndex).toBe(-1);
  });
});
