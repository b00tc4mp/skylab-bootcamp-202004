describe("find", function () {
    it("Should itereate on the array and return the value of the match", function () {
      var array = new Arroz (1, 2, 3, 1, 4);
      var match=array.find(function (element,index,array){
        if(index>2) return element>2;});
        expect(match).toBe(4);
        
    });
    it("Second Round:Should itereate on the array and return the value of the match", function () {
        var array = new Arroz (1, 2, 3, 1, 4);
        var match=array.find(function (element,index,array){
          return element<10;
        });
          expect(match).toBe(1);
          
      });
      it("collect the error if we don't pass a function", function () {
        var array = new Arroz (1, 2, 3, 1, 4);
  
        expect(function(){match=array.find()}).toThrowError(TypeError,"undefined is not a function");
        expect(function(){match=array.find(1)}).toThrowError(TypeError,"1 is not a function");
          
      });
 
  });
 