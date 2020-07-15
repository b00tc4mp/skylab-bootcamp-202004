describe("indexOf", function () {
    it("Should itereate on the array and return the index of the character matches with the value", function () {
      var array = [1, 2, 3];
  
      var matchIndex = indexOf(array, 3);
  
      expect(matchIndex).toBe(2);
    });
  
    it("Should itereate on the array and return the index of the character matches with the value even with start point", function () {
      var array = [1, 2, 3, 1];
  
      var matchIndex = indexOf(array, 1, 1);
  
      expect(matchIndex).toBe(3);
    });
    it("Should itereate on the array and return the index of the character matches with the value even with start point", function () {
      var array = [1,2,9,9];
  
      var matchIndex = indexOf(array, 2, 5);
  
      expect(matchIndex).toBe(-1);
    });
    it('itereate on the array and return the index of the character matches with the value"', function(){
      var array = [1, 2, 3, 3, 4, 1];
      
      var work = indexOf(array, 1, -2);
      expect(work).toBe(5);
    });
  
});