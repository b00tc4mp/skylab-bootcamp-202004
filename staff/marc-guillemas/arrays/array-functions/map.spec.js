// TODO
describe("map", function(){
    it("it will iterate on each element of the array, multiply them by 3 and create a new array", function() {
        var arr = [1, 2, 3];
        var result = [];
        
        map(arr, function(element, index) {
            result[index] = element * 3;

        });

        expect(result[0]).toBe(3);
        expect(result[1]).toBe(6);
        expect(result[2]).toBe(9);
    });

    it("it will iterate on each element of the array, turn them in upper-case and create a new array", function() {
        var arr = ["quiero", "mi", "taza"];
        var result = [];
        
        map(arr, function(element, index) {
            result[index] = element.toUpperCase();

        });

        expect(result[0]).toBe("QUIERO");
        expect(result[1]).toBe("MI");
        expect(result[2]).toBe("TAZA");
    });

    it("it will iterate on each element provide the index from the second argument of the expression (callback)", function() {
        var arr = [1, 2, 3];
        var result = [];
        
        map(arr, function(element, index, array) {
            result[index] = index;

        });

        expect(result[0]).toBe(0);
        expect(result[1]).toBe(1);
        expect(result[2]).toBe(2);
    });

    it("it will iterate on each element provide the full array from the third argument of the expression (callback)", function() {
        var arr = [1, 2, 3];
        var result = [];
        
        map(arr, function(element, index, array) {
            result[index] = arr;

        });

        expect(result[0]).toBe(arr);
        expect(result[1]).toBe(arr);
        expect(result[2]).toBe(arr);
    });
});

