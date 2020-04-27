describe("reduce", function () {
    it("Should itereate on the array and return the value of the match", function () {
      var array = [1, 2, 3, 4];
      var array1=[1,3,1];
      match=reduce(array,function (acumulator,value) {
        return acumulator+value;
      },3);
      match1=reduce(array1,function (acumulator,value) {
        return acumulator-value;
      });
      // 1 + 2 + 3 + 4
      // expected output: 10
        expect(match).toBe(13);
        expect(match1).toBe(-3);
    });
 
  });
 