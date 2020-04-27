describe("Arroz.prototype.every", function () {
    it("Must iterate through array and return true / false depending on function", function () {
      var array = new Arroz(1, 2, 3, 4, 4);
      match=array.every(function (element,index,array){
        if(index>=2) return element>1;
        if(index<=1) return element<3}
        );
        expect(match).toBe(true);
        
    });
    it("Must iterate through array and return true / false depending on function", function () {
        var array =new Arroz (1, 2, 3, 4);
        match=array.every(function (element,index,array){
          return element>3;
        });
          expect(match).toBe(false);
          
      });
      it("collect the error if we don't pass a function", function () {
        var array =new Arroz (1, 2, 3, 4);
        expect(function() {
          array.every()
      }).toThrowError(TypeError, 'undefined is not a function');
          
      });
 
  });