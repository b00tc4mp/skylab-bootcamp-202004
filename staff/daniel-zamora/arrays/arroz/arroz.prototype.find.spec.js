describe("Arroz.prototype.find", function () {
    it("Should iterate on the array and find the first elememnt to match with the condition", function () {
      var array = new Arroz(1, 2, 3, 4, 5);
  
      var matchIndex = array.find(function(element) {
        return  element > 2;
      }
      );
  
      expect(matchIndex).toBe(3);
    });
  
    it("Should iterate on the array and after not found any match, return 'undefined'", function () {
        var array = new Arroz(1, 2, 3, 4, 5);
    
        var matchIndex = array.find(function(element) {
          return  element < 0;
        }
        );
    
        expect(matchIndex).toBe(undefined);
      });
   
  });
  