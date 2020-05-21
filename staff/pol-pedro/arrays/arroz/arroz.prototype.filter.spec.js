describe('filter', function () {
    it('should iterate on each element and keep each value that pass the condition in the new array results', function () {
        var array = new Arroz ('spray', 'limit', 'elite', 'exuberant', 'destruction', 'present');
        var result = [];

        result = array.filter(function(element) {
            if (element.length > 6){
                return true;
            }
            return false;
        });

        expect(result[0]).toBe("exuberant");
        expect(result[1]).toBe("destruction");
        expect(result[2]).toBe("present");
    });

    it('should iterate on each element and keep each value that pass the condition in the new array results', function () {
        var array = new Arroz(1, 3, 5, 90, 2, 10, 13, 47);
        var result = [];

        result = array.filter(function(element) {
            if (element > 10){
                return true;
            }
            return false;
        });

        expect(result[0]).toBe(90);
        expect(result[1]).toBe(13);
        expect(result[2]).toBe(47);
    });

    it('should return apple because it exists', function () {
        var array = new Arroz('apple', 'banana', 'grapes', 'mango', 'orange');
        var result = [];
        result = array.filter(function(element) {
            return element === 'apple'
        })

        expect(result[0]).toBe('apple');
    });

    
});