describe("findIndex", function () {
    it("Should itereate on the array and return the value of the match", function () {
      var array = new Arroz (1, 2, 3, 1, 4);
      var match = array.findIndex(function (element,index,array){
        if(index>2) return element>2;});
        expect(match).toBe(4);
        
    });
    it("Should itereate on the array and return the value of the match", function () {
        var array = new Arroz (1, 2, 3, 1, 4);
        var match=array.findIndex(function (element,index,array){
          return element>2;
        });
          expect(match).toBe(2);
          
      });
      it("collect the error if we don't pass a function", function () {
        var array = new Arroz (1, 2, 3, 1, 4);

          expect(function () {
            var match=array.findIndex();
          }).toThrowError(TypeError,"undefined is not a function");
          
      });
  });



  