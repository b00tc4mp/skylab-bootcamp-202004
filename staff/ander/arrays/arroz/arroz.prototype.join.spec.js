describe("join", function () {
    it("Should itereate on the array and return the value of the match", function () {
        var array = new Arroz (1, 2, 3, 1, 4);
        var arr1= new Arroz ("a","b","c");
        match= array.join()
        match1= arr1.join();
        expect(match).toEqual("1,2,3,1,4");
        expect(match1).toEqual("a,b,c")
          
      });
    it("Should itereate on the array and return the value of the match", function () {
      var array = new Arroz (1, 2, 3, 1, 4);
      var arr1= new Arroz ("a","b","c");
        match=array.join("-")
        match1=arr1.join(" ");
        expect(match).toEqual("1-2-3-1-4");
        expect(match1).toEqual("a b c")
          
       });
       
});