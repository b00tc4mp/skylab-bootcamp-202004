describe('findIndex', function () {

    it('should iterate on each element and return a first element greater than 10', function () {

        var array = [111, 20, 3]
        var e = findIndex(array, function (element) {
            return element > 10;
        });
        expect(e).toEqual(0)
    });

    it('should iterate on each element and return undefined because do not find the element that meet the condition', function () {

        var array = [1, 2, 3]
        var e = findIndex(array, function (element) {
            return element > 10;
        });
        expect(e).toEqual(-1)
    });

    it('should iterate on each element and return undefined because do not find the element that meet the condition', function () {

        var array = ['hola', 'pepito', 'daria', 'elemento']
        var e = findIndex(array, function (element) {
            return element === 'mundo';
        });
        expect(e).toEqual(-1)
    });

    it('should iterate on each element and return a first element that length is iqual to 8 and index should be equal to 3', function () {

        var array = ['hola', 'pepito', 'daria', 'elemento']
        var e = findIndex(array, function (element) {
            return element.length === 8;
        });
        expect(e).toEqual(3)
    });

    it('should iterate on each element and return a first element that length is iqual to 8 provide the full array from the third argument of the expression', function () {

        var array = ['hola', 'pepito', 'daria', 'elemento']
        var arr = [];
        var e = findIndex(array, function (element, index, array) {
            arr[index] = array
            return element.length === 8; 
        });
    
        expect(e).toEqual(3)
        expect(arr[0]).toBe(array)
        expect(arr[1]).toBe(array)
        expect(arr[2]).toBe(array)
        expect(arr[3]).toBe(array)
    });

});