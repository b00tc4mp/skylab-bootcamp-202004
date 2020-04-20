describe("Arroz.prototype.slice", function () {
    it("Should make a new arroz with all values of the arroz, except first 2 elements", function () {
      var array = new Arroz(1, 2, 3, 4, 5);
  
      var matchIndex = array.slice(2);
  
      expect(matchIndex[0]).toBe(3);
      expect(matchIndex[1]).toBe(4);
      expect(matchIndex[2]).toBe(5);
      expect(matchIndex[3]).toBe(undefined);
      expect(array.length).toBe(5);


    });

    it("Should make a new arroz with all values of the original arroz, starting from position 2 included", function () {
      var array = new Arroz(1, 2, 3, 4, 5);
  
      var matchIndex = array.slice(-3,9);
  
      expect(matchIndex[0]).toBe(3);
      expect(matchIndex[1]).toBe(4);
      expect(matchIndex[2]).toBe(5);
  

   
  });

  // it("Should make a new arroz with all values of the arroz, except first 2 elements", function () {
  //   var array = new Arroz(1, 2, 3, 4, 5);

  //   var matchIndex = array.slice(0,-3);

  //   expect(matchIndex[0]).toBe(1);
  //   expect(matchIndex[1]).toBe(2);
  //   expect(matchIndex[2]).toBe(undefined);
    
  // });

  it("Should make a new arroz with all values of the arroz, except first 2 elements", function () {
    var array = new Arroz(1, 2, 3, 4, 5);

    var matchIndex = array.slice();

    expect(matchIndex).toEqual([]);
   
    
  });

  it("Should make a new empty arroz ", function () {
    var array = new Arroz("hola", "mundo", "que", "tal");

    var matchIndex = array.slice(2,-1);

    expect(matchIndex).toEqual(["que"]);
   
    
  });
  
});