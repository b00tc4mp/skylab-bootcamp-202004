describe('map', function () {
    it('Should create a new array with the results of the callback of each of its elements', function () {
        var array = [1,2,3,4,5];

        result=map(array,function(elements,index,fullarray){return elements*=2});

        expect(result[0]).toBe(2);
        expect(result[1]).toBe(4);
        expect(result[2]).toBe(6);
        expect(result[3]).toBe(8);
        expect(result[4]).toBe(10);
    });
    it('Should not change the array', function () {
        var array = [1,2,3,4,5];

        result=map(array,function(elements,index,fullarray){return elements*=2});

        expect(array[0]).toBe(1);
        expect(array[1]).toBe(2);
        expect(array[2]).toBe(3);
        expect(array[3]).toBe(4);
        expect(array[4]).toBe(5);
    });
});