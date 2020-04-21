describe('pop', function () {
    it('it should delete the last element of an array, in this case number 8', function () {
        var array = [1, 2, 3, 4, 5, 6, 7, 8]

        pop(array);
        expect(array.length).toBe(7);

    });

    it('it should delete the last element of an array, in this case the string ', function () {
        var array = ['read', 'the', 'fucking', 'documentation']
        pop(array)
        expect(array[array.length - 1]).toBe('fucking');

    });

    it('if array is empty it should return undefined', function () {

        var array = []
        var a = pop(array)
        expect(a).toBe(undefined)
    });












});