describe("Arroz.prototype.every", function () {
    it("Should itereate on the array and return the value of the match", function () {
      var array = new Arroz(1, 2, 3, 4, 4);
      match=array.every(function (element,index,array){
        if(index>=2) return element>1;
        if(index<=1) return element<3});
        expect(match).toBe(true);
        
    });
    it("Should itereate on the array and return the value of the match", function () {
        var array =new Arroz (1, 2, 3, 4);
        match=array.every(function (element,index,array){
          return element>3;
        });
          expect(match).toBe(false);
          
      });
 
  });