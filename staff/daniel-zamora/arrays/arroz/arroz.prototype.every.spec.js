describe("Arroz.prototype.every", function () {
  it("Should iterate on the array an return the index of the number 2", function () {
    var array = new Arroz(1, 2, 3);

    var matchEvery = array.every(function (number) {
      return number < 4;
    });

    expect(matchEvery).toBeTruthy();
  });

  it("Should iterate on the array an return false, due any match was found", function () {
    var array = new Arroz(1, 2, 3, 4, 5, 6, 7, 8);

    var matchEvery = array.every(function (number) {
      return number > 5;
    });

    expect(matchEvery).toBeFalsy();
  });

  it("should fail if any parameter its applied", function () {
    var array = new Arroz(1, 2, 3, 4, 5, 6, 7, 8);

    try {
      var matchEvery = array.every() > 5;
    } catch (error) {
      matchEvery = error;
    }
    expect(matchEvery instanceof Error).toBeTruthy();
  });

  it("should fail if the callbakc is not a function", function () {
    var array = new Arroz(1, 2, 3, 4, 5, 6, 7, 8);

    try {
      var matchEvery = array.every(array) > 5;
    } catch (error) {
      matchEvery = error;
    }
    expect(matchEvery instanceof Error).toBeTruthy();
  });

  it("should fail if the callback argument is not a function", function () {
    expect(function () {
      var arroz = new Arroz(1, 2, 3);
      arroz.every(undefined);
    }).toThrowError(TypeError, "undefined is not a function");
  });
});
