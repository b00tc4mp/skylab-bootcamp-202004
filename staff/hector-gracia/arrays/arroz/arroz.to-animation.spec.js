'use strict';

describe('Arroz.toAnimation', function () {
    it('should create an arroz to use in the console animation', function () {
        var test="test";
        var arroz = Arroz.toAnimation(test);
        var aux= new Arroz();


        expect(arroz.length).toBe((test.length+1)*5);
        expect(arroz.protype===aux.protype).toBe(true);
    });
    it('should not have toAnimation as an enumerable property', function () {
        var anim = Arroz.toAnimation("test");

        expect(Object.keys(anim).includes("toAnimation")).toBe(false);
    });
    
});