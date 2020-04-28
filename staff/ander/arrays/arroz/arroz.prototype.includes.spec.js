describe("includes", function () {
  it("Should itereate on the array and return the value of the match(T/F)", function () {
    var array = new Array(1, 2, 3);

    var matchIndex = array.includes(3);

    expect(matchIndex).toBe(true);
  });
  
  it("Should itereate on the array and return the value of the match(T/F)", function () {
    var array = new Array(1, 2, 3);
  
      var matchIndex = array.includes(9);
  
      expect(matchIndex).toBe(false);
    });
});
