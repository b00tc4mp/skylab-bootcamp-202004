describe('The method splice', function () {
    it(' insert elements without removing elements from array' , function () {

        var numbers = [ 1, 2, 4, 5, 6, 7];
        splice(numbers, 2, 0, 3);


        expect(numbers[2]).toBe(3);
        expect(numbers[3]).toBe(4);
        expect(numbers.length).toBe(7);

    });

    it('Insert elements y remove elements from the array' , function () {
        var numbers = [ 1, 2, 4, 5, 6, 7];

        splice(numbers, 2, 2);


        expect(numbers[2]).toBe(6);
        expect(numbers[3]).toBe(7);
        expect(numbers.length).toBe(4);
    });

    it('if the start is negative, start = array.length-(start in absolute value)' , function () {
        var numbers = [ 1, 2, 4, 5, 6, 7];

        splice(numbers, -1, 1);

        expect(numbers[4]).toBe(6);
        expect(numbers.length).toBe(5);
    });

});