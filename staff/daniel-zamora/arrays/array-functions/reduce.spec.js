describe("reduce", function () {
    it("Should itereate on the array and reduce for a sing;e value.", function () {
      var array = [1, 2, 3, 4];
  
      var result = reduce(array, function(a,b){ 
          return a+b;
      })
      
      
      expect(result).toBe(10);

    });
});