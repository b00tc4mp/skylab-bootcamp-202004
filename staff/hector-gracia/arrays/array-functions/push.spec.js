describe('push', function () {
    it('should add one or more elements to the end of an array and returns the new length of the array', function () {
        var array = [1, 2, 3];
        var element=4;

        push(array, element);

        expect(array[0]).toBe(1);
        expect(array[1]).toBe(2);
        expect(array[2]).toBe(3);
        expect(array[3]).toBe(4);
    });

    it('should iterate on each element and keep each value in upper-case in a new external array', function () {
        var array = ['hello', 'cruel', 'world'];
        var result = [];
        var element = 'bye';

        push(array, element);

        expect(array[0]).toBe('hello');
        expect(array[1]).toBe('cruel');
        expect(array[2]).toBe('world');
        expect(array[3]).toBe('bye');
    });
    it('should add one or more elements to the end of an array and returns the new length of the array', function () {
        var array = [1, 2, 3];
        var element=[4 ,5, 6];

        push(array, element);

        expect(array[0]).toBe(1);
        expect(array[1]).toBe(2);
        expect(array[2]).toBe(3);
        expect(array[3]).toBe(4);
        expect(array[4]).toBe(5);
        expect(array[5]).toBe(6);
    });
    it('should add one or more elements to the end of an array and returns the new length of the array', function () {
        var array = [1, 2, 3];
        var element=4;

        var lenght=push(array, element);

        expect(lenght).toBe(4)
    });
});