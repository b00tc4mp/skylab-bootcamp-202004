'use strict';

describe('Arroz.prototype.slice', function() {
    it(' This method returns a shallow copy of a portion of an array into a new array object selected from begin.', function() {
        var array= new Arroz (1, 2, 3, 4, 5);

        var result = array.slice(2);
        expect(result).toEqual([3, 4, 5]);
    });

    it('This method returns a shallow copy of a portion of an array into a new array object selected from begin to end (end not included) where begin and end represent the index of items in that array.', function() {
        var array = new Arroz (1, 2, 3, 4, 5);

        var result = array.slice(1,2);
        expect(result).toEqual([2]);
    });

    it('the original array will not be modified',function(){
        var array = new Arroz (1, 2, 3, 4, 5);
        var result = array.slice(1,2);

        expect(array[0]).toEqual(1);
        expect(array[1]).toEqual(2);
    });
});