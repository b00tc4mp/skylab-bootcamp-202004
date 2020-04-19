describe('splice', function () {
    it('it should keep in array first tree elements and it should put the rest of elements in arr', function () {
        var array = [1, 2, 3, 4, 5, 6, 7];

        var arr = splice(array, 3);

        expect(arr).toEqual([4, 5, 6, 7]);
        expect(array).toEqual([1, 2, 3]);
    });


    it('it should extract thee elements from the end and keep four first element in the origin array', function () {
        var array = [1, 2, 3, 4, 5, 6, 7];

        var arr = splice(array, -3);

        expect(arr).toEqual([5, 6, 7]);
        expect(array).toEqual([1,2,3,4])
    });

    it('it should provide the empty array and keep the origin array', function () {
        var array = [1, 2, 3, 4, 5, 6, 7];

        var arr = splice(array, -10);

        expect(arr).toEqual([1, 2, 3, 4, 5, 6, 7]);
        expect(array).toEqual([]);
    });

    it('it should provide a new array with all elements from origin array and origin array empty', function () {
        var array = [1, 2, 3, 4, 5, 6, 7];

        var arr = splice(array, 20);

        expect(arr).toEqual([]);
        expect(array).toEqual([1, 2, 3, 4, 5, 6, 7]);
    });

    it('it should extract two elements from index 2 (include) to index 4 (exclude) to a new array and keep the rest of elements in the origin array', function () {
        var array = [1, 2, 3, 4, 5, 6, 7];

        var arr = splice(array, 2, 2)

        expect(arr).toEqual([3, 4])
        expect(array).toEqual([1, 2, 5, 6, 7])
    });

    it('it should extract two elements from index 2 (include) to index 4 (exclude) to a new array and insert three new elements into the origin array', function () {
        var array = [1, 2, 3, 4, 5, 6, 7];

        var arr = splice(array, 2, 2, 66,88,99);

        expect(arr).toEqual([3, 4]);
        expect(array).toEqual([1, 2, 66, 88, 99, 5, 6, 7]);

        var array = [1, 2, 3, 4, 5, 6, 7];

        var arr = splice(array, 2, 0, 66,88,99);

        expect(arr).toEqual([]);
        expect(array).toEqual([1, 2, 66, 88, 99, 3, 4, 5, 6, 7]);
    });

    it('it should insert one element in the origin array', function () {
        var array = [1, 2, 3, 4, 5, 6, 7];

        var arr = splice(array, -2, 1, 'hola');

        expect(arr).toEqual([6]);
        expect(array).toEqual([1, 2, 3, 4, 5, 'hola', 7]);

        array = [1, 2, 3, 4, 5, 6, 7];

        arr = splice(array, -2, 0, 'hola');

        expect(arr).toEqual([]);
        expect(array).toEqual([1, 2, 3, 4, 5, 'hola', 6, 7]);
    });

});