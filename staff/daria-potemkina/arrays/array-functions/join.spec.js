describe('join', function () {

    it('it should return a tring with elements of array separating for ,', function () {

        var array = ['hola', 'mundo', '!'];
        var str = join(array, ',');

        expect(str).toEqual('hola,mundo,!');

        expect(array[0]).toBe('hola')
        expect(array[1]).toBe('mundo')
        expect(array[2]).toBe('!')

        array = ['hola', 'mundo', '!'];
        var str = join(array);

        expect(str).toEqual('hola,mundo,!');

    });


    it('it should return a string with elements of array sin separation', function () {

        var array = ['hola', 'mundo', '!'];
        var str = join(array, '');

        expect(str).toEqual('holamundo!');

        expect(array[0]).toBe('hola')
        expect(array[1]).toBe('mundo')
        expect(array[2]).toBe('!')


    });

    it('it should return a string with elements of array separating by one space', function () {

        var array = [1, 2, 3, 4, 5, 6, 7];
        var str = join(array, ' ')

        expect(str).toEqual('1 2 3 4 5 6 7');

        expect(array[0]).toBe(1)
        expect(array[1]).toBe(2)
        expect(array[2]).toBe(3)
        expect(array[3]).toBe(4)
        expect(array[4]).toBe(5)
        expect(array[5]).toBe(6)
        expect(array[6]).toBe(7)
    });

})