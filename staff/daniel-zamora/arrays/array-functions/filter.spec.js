describe("filter", function () {
  it("Should itereate on the array and return a variable with the value of the match between array and current value.", function () {
    var array = [1, 2, 3, 4, 5];

   filter(array, function())
    

    expect(result[0]).toBe(10);
    expect(result[1]).toBe(20);
    expect(result[2]).toBe(30);
  });

  
  // filter(array, function(4,0));

  // expect(matchIndex).toBe(true);
});

describe("filter", function () {
  it("Should itereate on the array and return the value of the match", function () {
  
    var filtered = [12, 5, 8, 130, 44]
    filter(filtered,function (value) {
      return value >= 10;
    });
  
      expect(filtered[0]).toBe(12);
      
  });
  }); 