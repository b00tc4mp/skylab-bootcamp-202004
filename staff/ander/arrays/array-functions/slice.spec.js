describe("slice", function () {
    it("Should itereate on the array and return the value of the match", function () {
        var array = [1, 2, 3, 1, 4];
        match=slice(array,2,-2)
        expect(match[0]).toBe(3);
        expect(match.length).toBe(1)

      });
    it( "index with a negative values.", function () {
        var array = [1, 2, 3, 1, 4];
        match=slice(array,-2)
        expect(match[0]).toBe(1);
        expect(match[1]).toBe(4);
       });
       
    it( "If index is omitted the default value is 0..", function () {
        var array = [1, 2, 3, 1, 4];
        match=slice(array)
        expect(match[0]).toBe(1);
        expect(match[1]).toBe(2);
       }); 
  /* it( "If index is greater than the length of the array, an empty array is returned", function () {
        var array = [1, 2, 3, 1, 4];
        match=slice(array,8)
        expect(match[0]).toEqual([]);
       });  */
     
    it( "If index is omitted the default value is 0..", function () {
        var array = [1, 2, 3, 1, 4];
        match=slice(array)
        expect(match[0]).toBe(1);
        expect(match[1]).toBe(2);
       });
    }); 