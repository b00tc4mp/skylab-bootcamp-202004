'use strict';

describe('ArrozConLeche', function () {
    it('should instanciate an ArrozConLeche with length 0 on no arguments', function () {
        var array = new ArrozConLeche();

        expect(array instanceof Arroz).toBeTruthy();
        expect(array.length).toBe(0);
    });
    it('should instanciate an ArrozConLeche whose elements are the arrozs its made of', function () {
        var arroz1=new Arroz(1,2);
        var arroz2=new Arroz(3,4);
        var arroz3=new Arroz(5,6);
        var arrozConLeche = new ArrozConLeche(arroz1,arroz2,arroz3);

        expect(arrozConLeche.length).toBe(3);
        expect(arrozConLeche[0]).toBe(arroz1);
        expect(arrozConLeche[1]).toBe(arroz2);
        expect(arrozConLeche[2]).toBe(arroz3);
    });
    it('should throw an error when trying to fill it with something that is not an arroz', function () {
        var _error;

        try{
            var arrozConLeche = new ArrozConLeche(new Arroz(1,2),[3,4],new Arroz(5,6));

        }catch(error){
            _error=error;
        }
        expect(error.message).toBe([3,4] + ' is not an Arroz');
    });
    it('should not have length as an enumerable property', function () {
        var arrozConLeche = new ArrozConLeche(new Arroz(1,2),new Arroz(3,4),new Arroz(5,6));

        expect(Object.keys(arroz).includes("length")).toBe(false);
    });
    it('should can use arroz methods', function () {
        var arroz1=new Arroz(1,2);
        var arroz2=new Arroz(3,4);
        var arroz3=new Arroz(5,6);
        var arrozConLeche = new ArrozConLeche(arroz1,arroz2);

        arrozConLeche.push(arroz3)

        expect(arrozConLeche.length).toBe(3);
        expect(arrozConLeche[2]).toBe(arroz3);
        arrozConLeche.pop();
        expect(arrozConLeche.length).toBe(2);
        expect(arrozConLeche[2]).toBe(undefined);
    });
    
});