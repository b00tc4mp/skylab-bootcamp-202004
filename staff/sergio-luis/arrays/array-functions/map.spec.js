
describe('map', function () {
    it('should iterate on map element and keep each value multiplied by 10 in a new external array', function () {
        var array = [1,2,3]
        var result =[]
 
        result = map(array, function(element,index,array){
            return element * 10
            
        })
        //function test
        expect(result[0]).toBe(10);
        expect(result[1]).toBe(20);
        expect(result[2]).toBe(30);
    });

    it('should iterate on map element provide the index from the second argument of the expression (callback)', function () {
        var array = [1, 2, 3];
        var result = [];

        result = map(array, function(element,index,array){
            return index;
        });

        expect(result[0]).toBe(0);
        expect(result[1]).toBe(1);
        expect(result[2]).toBe(2);
    });

    it('should iterate on map element provide the full array from the third argument of the expression (callback)', function () {
        var array = [1, 2, 3];
        var result = [];

        result = map(array, function(element,index,array){
            return array;
        });   

        expect(result[0]).toBe(array);
        expect(result[1]).toBe(array);
        expect(result[2]).toBe(array);
    });
});