
describe("Arroz.prototype.filter", function () {
  it("Shoould find the match betwen search value and array, and make a new array with this matches", function () {
    var array = new Arroz(1, 2, 3, 4, 5, 6);

    var matchArray = array.filter(function(searchValue) {
        return searchValue > 3;
  });
    expect(matchArray[0]).toBe(4);
    expect(matchArray[1]).toBe(5);
    expect(matchArray[2]).toBe(6);
  });

  it("Shoould find the match betwen search value and array, starting from position 2 and make a new array with this matches", function () {
    var array = new Arroz(1, 2, 3, 4, 5, 6);

    var matchArray = array.filter(function(searchValue,index) {
        return searchValue > 4;
  },2);
    expect(matchArray[0]).toBe(5);
    expect(matchArray[1]).toBe(6);
    
  });

  it("Should iterate on the array, and don't found any match, so, should return an empty array", function () {
    var array = new Arroz(1, 2, 3, 4, 5, 6);

    var matchArray = array.filter(function(searchValue) {
        return searchValue > 8;
  });
    expect(matchArray).toEqual([]);
 
  });

  it("Should iterate on the array, and don't found any match, so, should return an empty array", function () {
    var array = new Arroz(1, 2, 3, 4, 5, 6);

    var matchArray = array.filter(function(searchValue,index) {
        return searchValue > 8;
  },9);
    expect(matchArray).toEqual([]);
 
  });

  it("should fail if any parameter its applied", function () {
    var array = new Arroz(1, 2, 3, 4, 5, 6, 7, 8);

    try {
      var matchArray = array.filter() > 5;
    } catch (error) {
      matchArray = error;
    }
    expect(matchArray instanceof Error).toBeTruthy();
  });

  it("should fail if the callbakc is not a function", function () {
    var array = new Arroz(1, 2, 3, 4, 5, 6, 7, 8);

    try {
      var matchArray = array.filter(array) > 5;
    } catch (error) {
      matchArray = error;
    }
    expect(matchArray instanceof Error).toBeTruthy();
  });

});
