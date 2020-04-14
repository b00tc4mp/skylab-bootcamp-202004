describe('splice', function () {

    it('it should keep in array first tree elements and it should put the rest of elements in arr', function () {

        var array = [1, 2, 3, 4, 5, 6, 7];
        var arr = splice(array, 3);

        expect(arr).toEqual([4, 5, 6, 7]);
        expect(array).toEqual([1, 2, 3]);

    });


    it('...', function () {

        var array = [1, 2, 3, 4, 5, 6, 7];
        var arr = splice(array, -3);

        expect(arr).toEqual([5, 6, 7])
        expect(array).toEqual([1,2,3,4])

    });

    it('...', function () {

        var array = [1, 2, 3, 4, 5, 6, 7];
        var arr = splice(array, -10);

        expect(arr).toEqual([1, 2, 3, 4, 5, 6, 7]);
        expect(array).toEqual([]);

    });

    it('...', function () {

        var array = [1, 2, 3, 4, 5, 6, 7];
        var arr = slice(array, 20)

        expect(arr).toEqual([])

        expect(array).toEqual([1, 2, 3, 4, 5, 6, 7])

    });

});