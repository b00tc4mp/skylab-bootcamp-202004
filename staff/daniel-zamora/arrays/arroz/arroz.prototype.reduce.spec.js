describe("Arroz.prototype.reduce", function () {
  it("Shoould add the value of the first value with the rest of the array", function () {
    var array = new Arroz(1, 2, 3, 4, 5);

    var matchIndex = array.reduce(function(acumulator,element) {
      return acumulator + element;
    }
    );

    expect(matchIndex).toBe(15);
  });

  it("Shoould add the value of the first value with the rest of the array", function () {
    var array = new Arroz(1, 2, 3, 4, 5);

    var matchIndex = array.reduce(function(acumulator,element) {
      return acumulator * element;
    }
    );

    expect(matchIndex).toBe(120);
  });
 
});
