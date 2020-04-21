"use strict";

describe('Arroz.prototype.reverse',function(){
    it('The reverse() method reverses an array in place. The first array element becomes the last, and the last array element becomes the first.', function(){
        var array = new Arroz(1,2,3);

        var reverse = array.reverse();

        expect(array[0]).toBe(3);
        expect(array[1]).toBe(2);
        expect(array[2]).toBe(1);
        expect(reverse[0]).toBe(3);
        expect(reverse[1]).toBe(2);
        expect(reverse[2]).toBe(1);
    }); 
    it('The reverse() method reverses an array in place. The first array element becomes the last, and the last array element becomes the first.', function(){
        var array = new Arroz('a','l','m');

        var reverse = array.reverse();

        expect(array[0]).toBe('m');
        expect(array[1]).toBe('l');
        expect(array[2]).toBe('a');
        expect(reverse[0]).toBe('m');
        expect(reverse[1]).toBe('l');
        expect(reverse[2]).toBe('a');
    }); 
});