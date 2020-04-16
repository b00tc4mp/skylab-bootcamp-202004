describe("reduce", function () {
    it("Should itereate on the array and return the value of the match", function () {
      var array = new Arroz(1, 2, 3, 4);
      var array1=new Arroz(1,3,1);
      match=array.reduce (function (acumulator,value) {
        return acumulator+value;
      },3);
      match1=array1.reduce(function (acumulator,value) {
        return acumulator-value;
      });
      // 1 + 2 + 3 + 4
      // expected output: 10
        expect(match).toBe(13);
        expect(match1).toBe(-3);
    });
 
  });
 