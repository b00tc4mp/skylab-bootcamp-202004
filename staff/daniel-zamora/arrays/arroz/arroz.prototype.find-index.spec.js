describe("Arroz.prototype.findIndex", function () {
  it("Should iterate on the array an return the index of the number 2", function () {
    var array = new Arroz(1, 2, 3);

    var matchIndex = array.findIndex(function(number){
        return number > 1;
    });

    expect(matchIndex).toBe(1);
  });

  it("Should iterate on the array an return -1, due any match was found", function () {
    var array = new Arroz(1, 2, 3, 4, 5, 6, 7, 8);

    var matchIndex = array.findIndex(function(number){
        return number > 9; 
    });

    expect(matchIndex).toBe(-1);
  });

  it("Should iterate on the array of strings and return -1, due any match was found", function () {
    var array = new Arroz('no', 'se', 'como', 'mas', 'testear');

    var matchIndex = array.findIndex(function(word){
        return word > 9; 
    });

    expect(matchIndex).toBe(-1);
  });
  

});
