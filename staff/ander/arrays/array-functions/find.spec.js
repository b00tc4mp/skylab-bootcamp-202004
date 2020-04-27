describe("find", function () {
    it("Should itereate on the array and return the value of the match", function () {
      var array = [1, 2, 3, 4];
      match=find(array,function (element,index,array){
        if(index>2) return element>2;});
        expect(match).toBe(4);
        
    });
    it("Should itereate on the array and return the value of the match", function () {
        var array = [1, 2, 3, 4];
        match=find(array,function (element,index,array){
          return element<10;
        });
          expect(match).toBe(1);
          
      });
 
  });
 