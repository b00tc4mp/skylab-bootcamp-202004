describe('splice', function () {
    it('it should keep in array first one elements and it should put the rest of elements in arr', function () {
        var array = new Arroz(1, 2, 3, 4, 5);
        var result1 = array.splice(2);
        expect(result1[0]).toBe(3);
        expect(result1[1]).toBe(4);
        expect(result1[2]).toBe(5);
        expect(array[0]).toBe(1);
        expect(array[1]).toBe(2);

        var array = new Arroz(1, 2, 3, 4, 5);
        var result1 = array.splice(-2);
        expect(result1[0]).toBe(4);
        expect(result1[1]).toBe(5);
        expect(array[0]).toBe(1);
        expect(array[1]).toBe(2);
        expect(array[2]).toBe(3);
    });

    // it('it should keep in array first two elements and it should put the rest of elements in arr', function () {
    //     var array = new Arroz(1, 2, 3, 4, 5);
    //     var result1 = array.splice(2,1);
    //     expect(result1[0]).toBe(3);
    //     expect(array[0]).toBe(1);
    //     expect(array[1]).toBe(2);
    //     expect(array[2]).toBe(4);
    //     expect(array[3]).toBe(5);

    //     var array = new Arroz(1, 2, 3, 4, 5);
    //     var result1 = array.splice(2,2);
    //     expect(result1[0]).toBe(3);
    //     expect(result1[1]).toBe(4);
    //     expect(array[0]).toBe(1);
    //     expect(array[1]).toBe(2);
    //     expect(array[2]).toBe(5);
    // });



    // it('it should extract thee elements from the end and keep four first element in the origin array', function () {
    //     var array = [1, 2, 3, 4, 5, 6, 7];

    //     var arr = splice(array, -3);

    //     expect(arr).toEqual([5, 6, 7]);
    //     expect(array).toEqual([1,2,3,4])
    // });

    // it('it should provide the empty array and keep the origin array', function () {
    //     var array = [1, 2, 3, 4, 5, 6, 7];

    //     var arr = splice(array, -10);

    //     expect(arr).toEqual([1, 2, 3, 4, 5, 6, 7]);
    //     expect(array).toEqual([]);
    // });

    // it('it should provide a new array with all elements from origin array and origin array empty', function () {
    //     var array = [1, 2, 3, 4, 5, 6, 7];

    //     var arr = splice(array, 20);

    //     expect(arr).toEqual([]);
    //     expect(array).toEqual([1, 2, 3, 4, 5, 6, 7]);
    // });

    // it('it should extract two elements from index 2 (include) to index 4 (exclude) to a new array and keep the rest of elements in the origin array', function () {
    //     var array = [1, 2, 3, 4, 5, 6, 7];

    //     var arr = splice(array, 2, 2)

    //     expect(arr).toEqual([3, 4])
    //     expect(array).toEqual([1, 2, 5, 6, 7])
    // });

    // it('it should extract two elements from index 2 (include) to index 4 (exclude) to a new array and insert three new elements into the origin array', function () {
    //     var array = [1, 2, 3, 4, 5, 6, 7];

    //     var arr = splice(array, 2, 2, 66,88,99);

    //     expect(arr).toEqual([3, 4]);
    //     expect(array).toEqual([1, 2, 66, 88, 99, 5, 6, 7]);
    // });

}); 