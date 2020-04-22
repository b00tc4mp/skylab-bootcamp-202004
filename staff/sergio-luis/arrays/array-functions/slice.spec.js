describe("slice", function () {
    it("The slice() method returns a shallow copy of a portion of an array into a new array object selected from begin to end (end not included) where begin and end represent the index of items in that array. The original array will not be modified.", function () {
      var array1 = [1, 2, 3, 4, 5, 6, 7];
  
      var result1 = slice(array1, 2, 5);
  
      var result2 = slice(array1, -4, 6);
  
      var result3 = slice(array1, 2, -2);
  
      expect(result1[0]).toBe(3);
      expect(result1[1]).toBe(4);
      expect(result2[0]).toBe(4);
      expect(result2[1]).toBe(5);
      expect(result3[0]).toBe(3);
      expect(result3[1]).toBe(4);
    });
  });
  