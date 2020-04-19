describe("slice", function () {
    it("should iterate by the begin item to the end item, and return the values in a new array", function () {
        var array = new Arroz(1, 2, 3, 1, 4);
        var match=array.slice(2);
        expect(match[0]).toBe(3);
        expect(match.length).toBe(3);
       });
       
    it( "index with a negative values.", function () {
        var array = new Arroz(1, 2, 3, 1, 4);
        var match=array.slice(2,-2);
        expect(match[0]).toBe(3);
        expect(match.length).toBe(1);
       });
       
       
    it( "index and final value with a negative values", function () {
        var array = new Arroz(1, 2, 3, 1, 4);
        var match=array.slice(-5,-2);
        expect(match[0]).toBe(1);
        expect(match[1]).toBe(2);
       }); 
       }); 
  /* it( "If index is greater than the length of the array, an empty array is returned", function () {
        var array = [1, 2, 3, 1, 4];
        match=slice(array,8)
        expect(match[0]).toEqual([]);
       });  */
     
    