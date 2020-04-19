describe("every", function () {
    it("Should itereate on the array and return true if this elements satisfies the condition", function () {
      var array = [1, 2, 3];

        
      var matchIndex = every(array, function(element){
            return element < 5
      });
  
      expect(matchIndex).toBeTruthy();
    });
  
    it("Should itereate on the array and false when one of the element doesn't match with the condition from index 1", function () {
      var array = [1, 2, 3, 5];
  
      var matchIndex = indexOf(array,function(element){
          return element > 4
      },1);

      expect(matchIndex).toBeFalsy();
    });

  
  });
