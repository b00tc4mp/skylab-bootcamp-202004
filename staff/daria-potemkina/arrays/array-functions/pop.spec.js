describe('pop', function () {
    it('it should delete the last element of an array, in this case number 8', function () {

        var array = [1, 2, 3, 4, 5, 6, 7, 8]
        var newArray = pop(array);

        expect(newArray).toEqual([8]);
        expect(newArray.length).toBe(1);
        expect(array.length).toBe(7);

    });


    it('it should delete the last element of an array, in this case the string ', function () {

        var array = ['maria', 'anna', 'lucia', 'sofia']
        pop(array)
        expect(array.length).toBe(3);

    });


    it('if array is empty it should return undefined', function () {

        var array = []
        var a = pop(array)
        expect(a).toBe(undefined)

    });
}) 