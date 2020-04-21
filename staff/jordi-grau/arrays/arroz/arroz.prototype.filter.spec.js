'use strict'

describe('arroz.prototype.filter', function () {
    it('filter a array and return an new array', function () {
        var array = new Arroz(5,2,1);

        var newArray = array.filter(function(element){
            return element < 4;
        });

        expect(newArray[0]).toBe(2);
        expect(newArray[1]).toBe(1);
    });
    it('filter a array and return -1 if no find coincidence', function () {
        var array = new Arroz('Hola','que','Tal');
        var newArray = array.filter(function(element){
            return element.length > 5;
        });
        expect(newArray).toBe(-1);
    });
    it('filter a array is empty return -1 if no find coincidence', function () {
        var array = new Arroz();
        var newArray = array.filter(function(element){
            return element.length > 5;
        });
        expect(newArray).toBe(-1);
    });
});