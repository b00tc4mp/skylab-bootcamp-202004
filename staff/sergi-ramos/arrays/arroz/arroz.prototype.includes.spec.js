describe("Arroz.prototype.includes", function () {
    it("should return true or false if it finds an element inside the array or  with an initial position", function () {
        var array = new Arroz(1, 2, 3, 4, 5);
        

        var a =  array.includes(2,1)

       expect(a).toBe(true);
       
    });
    it("should return true or false if it finds an element inside the array or not whit an initial position", function () {
        var array = new Arroz(1, 2, 3, 4, 5);
        

        var a =  array.includes(2,3)

       expect(a).toBe(false);
       
    });

    it("should return true or false if it finds an element inside the array or not", function () {
        var array = new Arroz(1, 2, 3, 4, 5);
        

        var a =  array.includes(1)

       expect(a).toBe(true);
       
    });

    it("should return true or false if it finds an element inside the array or not", function () {
        var array = new Arroz(1, 2, 3, 4, 5);
        

        var a =  array.includes(8)

       expect(a).toBe(false);
       
    });
    
});