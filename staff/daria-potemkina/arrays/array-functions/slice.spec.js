describe('slice', function () {

    it('it should put in the array from index 2 included', function () {

        var array = [1, 2, 3, 4, 5, 6, 7];
        var arr = slice(array, 2);
        expect(arr).toEqual([3, 4, 5, 6, 7]);

        expect(array[0]).toBe(1)
        expect(array[1]).toBe(2)
        expect(array[2]).toBe(3)
        expect(array[3]).toBe(4)
        expect(array[4]).toBe(5)
        expect(array[5]).toBe(6)
        expect(array[6]).toBe(7)

    });


    it('it should put in the array from position 3 starting from end', function () {

        var array = [1, 2, 3, 4, 5, 6, 7];
        var arr = slice(array, -3)
        expect(arr).toEqual([5, 6, 7])

        expect(array[0]).toBe(1)
        expect(array[1]).toBe(2)
        expect(array[2]).toBe(3)
        expect(array[3]).toBe(4)
        expect(array[4]).toBe(5)
        expect(array[5]).toBe(6)
        expect(array[6]).toBe(7)

    });

    it('it should put in the array between index 3 and 5 (both included)', function () {
        var array = [1, 2, 3, 4, 5, 6, 7];

        var arr = slice(array, 3, -2);
        
        expect(arr).toEqual([4, 5])

        expect(array[0]).toBe(1)
        expect(array[1]).toBe(2)
        expect(array[2]).toBe(3)
        expect(array[3]).toBe(4)
        expect(array[4]).toBe(5)
        expect(array[5]).toBe(6)
        expect(array[6]).toBe(7)

    });

    it('it should put in the array all elements from original array', function () {

        var array = [1, 2, 3, 4, 5, 6, 7];
        var arr = slice(array)
        expect(arr).toEqual([1, 2, 3, 4, 5, 6, 7])

        expect(array[0]).toBe(1)
        expect(array[1]).toBe(2)
        expect(array[2]).toBe(3)
        expect(array[3]).toBe(4)
        expect(array[4]).toBe(5)
        expect(array[5]).toBe(6)
        expect(array[6]).toBe(7)

    });


    it('it should return an empty array', function () {

        var array = [1, 2, 3, 4, 5, 6, 7];
        var arr = slice(array, 10)

        expect(arr).toEqual([])

        expect(array[0]).toBe(1)
        expect(array[1]).toBe(2)
        expect(array[2]).toBe(3)
        expect(array[3]).toBe(4)
        expect(array[4]).toBe(5)
        expect(array[5]).toBe(6)
        expect(array[6]).toBe(7)

    });

    it('it should return all emenets from array', function () {

        var array = [1, 2, 3, 4, 5, 6, 7];
        var arr = slice(array, -10)

        expect(arr).toEqual([1, 2, 3, 4, 5, 6, 7])

        expect(array[0]).toBe(1)
        expect(array[1]).toBe(2)
        expect(array[2]).toBe(3)
        expect(array[3]).toBe(4)
        expect(array[4]).toBe(5)
        expect(array[5]).toBe(6)
        expect(array[6]).toBe(7)

    });

    it('it should return an empty array', function () {

        var array = [1, 2, 3, 4, 5, 6, 7];
        var arr = slice(array, 2, -20)

        expect(arr).toEqual([])

        expect(array[0]).toBe(1)
        expect(array[1]).toBe(2)
        expect(array[2]).toBe(3)
        expect(array[3]).toBe(4)
        expect(array[4]).toBe(5)
        expect(array[5]).toBe(6)
        expect(array[6]).toBe(7)

    });

    it('it should put in the array between index 2 and 6 (first included and end excluded)', function () {

        var array = [1, 2, 3, 4, 5, 6, 7];
        var arr = slice(array, 2, 6)

        expect(arr).toEqual([3, 4, 5, 6])

        expect(array[0]).toBe(1)
        expect(array[1]).toBe(2)
        expect(array[2]).toBe(3)
        expect(array[3]).toBe(4)
        expect(array[4]).toBe(5)
        expect(array[5]).toBe(6)
        expect(array[6]).toBe(7)

    });

    it('it should put in the array between index 2 and 6 (first included and end excluded)', function () {

        var array = ['maria', 'ana', 'sofia', 'elena'];
        var arr = slice(array, 1, 3)

        expect(arr).toEqual(['ana', 'sofia'])

        expect(array[0]).toBe('maria')
        expect(array[1]).toBe('ana')
        expect(array[2]).toBe('sofia')
        expect(array[3]).toBe('elena')

    });

})