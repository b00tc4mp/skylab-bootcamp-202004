describe("Arroz.prototype.every", function () {
  it("Should iterate on the array an return the index of the number 2", function () {
    var array = new Arroz(1, 2, 3);

    var matchIndex = array.every(function(number){
        return number < 4;
    });

    expect(matchIndex).toBeTruthy();
  });

  it("Should iterate on the array an return -1, due any match was found", function () {
    var array = new Arroz(1, 2, 3, 4, 5, 6, 7, 8);

    var matchIndex = array.every(function(number){
        return number > 5; 
    });

    expect(matchIndex).toBeFalsy();
  });


});
