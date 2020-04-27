describe('slice', function() {
    it(' This method returns a shallow copy of a portion of an array into a new array object selected from begin to end (end not included) where begin and end represent the index of items in that array. The original array will not be modified.', function() {
        var array = [1, 2, 3, 4, 5];

        var result = slice(array, 2);



        expect(result).toEqual([3, 4, 5]);


    });

    it('This method returns a shallow copy of a portion of an array into a new array object selected from begin to end (end not included) where begin and end represent the index of items in that array. The original array will not be modified.', function() {
        var array = [1, 2, 3, 4, 5];





        expect(slice(array, 1, 2)).toEqual([2]);

    });
});