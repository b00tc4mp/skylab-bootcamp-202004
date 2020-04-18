describe("Arroz.prototype.includes", function () {
  it("Shoould find the value of the first match with given valies in the array", function () {
    var array = new Arroz(1, 2, 3, 4, 5);

    var matchIndex = array.includes(2);

    expect(matchIndex).toBe(true);
  });

  it("Should compare two strings with different values and confirm is false", function () {
    var array = new Arroz(1, 2, 3, 4, 5, 'c');

    var matchIndex = array.includes('e');

    expect(matchIndex).toBe(false);
  });

  it("Should compare ", function () {
    var array = new Arroz(1, 2, 3, 4, 5, NaN);

    var matchIndex = array.includes(NaN);

    expect(matchIndex).toBe(true);
  });

  it("...", function () {
    var objectToCompare = new Arroz ()
    var array = new Arroz(1, 2, 3, 4, 5, objectToCompare);

    var matchIndex = array.includes(objectToCompare);

    expect(matchIndex).toBe(true);

    var matchIndex = array.includes(new Arroz());

    expect(matchIndex).toBe(false);
  });
 
});
