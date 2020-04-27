describe("some", function () {
    it("Should itereate on the array and return the value of the match", function () {
      var array = [1, 2, 3, 1, 4];
      match=some(array,function (element,index,array){
        if(index>2) return element>3;});
        expect(match).toBe(true);
        
    });
    it("Should itereate on the array and return the value of the match", function () {
        var array = [1, 2, 3, 4];
        match=some(array,function (element,index,array){
          return element>2;
        });
          expect(match).toBe(true);
          
      });
 
  });