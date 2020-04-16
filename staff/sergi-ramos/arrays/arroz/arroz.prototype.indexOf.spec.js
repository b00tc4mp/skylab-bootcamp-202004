describe("Arroz.prototype.indexOf", function () {
    it("should return the index of array when find the first element that you pass like a parameter", function () {
        var array = new Arroz(1, 2, 3, 4, 5);
        

        var a =  array.indexOf(2)

       expect(a).toBe(true);
       
    });

    it("should return the index of array when find the first element that you pass like a parameter with an initial position", function () {
        var array = new Arroz(1, 2, 3, 4, 5);
        

        var a =  array.indexOf(2,1)

       expect(a).toBe(true);
       
    });

    it("should return the index of array when find the first element that you pass like a parameter with an initial position or -1", function () {
        var array = new Arroz(1, 2, 3, 4, 5);
        

        var a =  array.indexOf(2,4)

       expect(a).toBe(-1);
       
    });

});