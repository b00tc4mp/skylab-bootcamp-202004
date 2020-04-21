describe('filter', function() {
    it("should return an array with numbers that are below 15", function() {
        var  numArr = [1, 22, 13, 17, 19, 15];

        var result = filter(numArr, function (x) {
            return x < 15;
        });

        expect(result).toEqual([1, 13]);
    });


    it("should return an array with words that have 4 letters or more", function() {

        var strArray = ["alejandro", "cris", "pol", "ana", "marc", "fer", "lua"];

        var result = filter(strArray, function(x) {
            return x.length >= 4;  
        });

        expect(result).toEqual(["alejandro", "cris", "marc"])
        
    });

    it('should iterate on each element provide the index from the second argument of the expression (callback)', function () {
        var array = [1, 2, 3];
        var result = [];

        filter(array, function(element, index, array) {
            result[index] = index;
        });

        expect(result[0]).toBe(0);
        expect(result[1]).toBe(1);
        expect(result[2]).toBe(2);
    });

    it('should iterate on each element provide the full array from the third argument of the expression (callback)', function () {
        var array = [1, 2, 3];
        var result = [];

        filter(array, function(element, index, array) {
            result[index] = array;
        });

        expect(result[0]).toBe(array);
        expect(result[1]).toBe(array);
        expect(result[2]).toBe(array);
    });
});