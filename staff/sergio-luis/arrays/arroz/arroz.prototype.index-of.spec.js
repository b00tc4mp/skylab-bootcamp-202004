"use estrict";

describe('Arroz.prototype.indexOf', function () {
    it('Find index of position', function () {
        var array = new Arroz(10,20,30,40,50,60,70)
        var result = array.indexOf(40);
        
        expect(result).toBe(3);
        expect(array.length).toBe(7);
    });
    it('Find index of position with positive index', function () {
        var array = new Arroz(1,2,3,4,5,6,7)
        var result= array.indexOf(1,2);
            
        expect(result).toBe(-1)
    });

    it('Find index of position with negative index', function () {
        var array = new Arroz(1,2,3,4,5,6,7)
        var result= array.indexOf(6,-3)

        expect(result).toBe(5)
    });
    it('If you don`t pass any parameter sould be -1', function () {
        var array = new Arroz(1,2,3,4,5,6,7)
        var result= array.indexOf()

        expect(result).toBe(-1)
    });
});