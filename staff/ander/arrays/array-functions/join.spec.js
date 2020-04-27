describe("join", function () {
    it("Should itereate on the array and return the value of the match", function () {
        var array = [1, 2, 3, 1, 4];
        var arr1=["a","b","c"];
        match=join(array)
        match1=join(arr1);
        expect(match).toEqual("1,2,3,1,4");
        expect(match1).toEqual("a,b,c")
          
      });
    it("Should itereate on the array and return the value of the match", function () {
        var array = [1, 2, 3, 1, 4];
        var arr1=["a","b","c"];
        match=join(array,"-")
        match1=join(arr1," ");
        expect(match).toEqual("1-2-3-1-4");
        expect(match1).toEqual("a b c")
          
       });
    
});