'use strict'

describe("Arroz.prototype.pop", function () {
    it("delete the last element of the array", function () {
        var array = new Arroz(1, 2, 3, 4, 5);
        
        var a =  array.pop();
        expect(a).toBe(5);
        expect(a.length)

        var b = array.pop();
        expect(b).toBe(4);   
    });

    it("should return undefined with an empty Arroz", function () {
        var array = new Arroz( );
        
        var a =  array.pop();
        expect(a).toBe(undefined);
        
          
    });





});