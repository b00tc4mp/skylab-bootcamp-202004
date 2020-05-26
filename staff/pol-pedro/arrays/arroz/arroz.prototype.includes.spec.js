describe('includes', function () {

    it('should iterate on each element and keep each value that pass the condition in the new array results', function () {
        var array = new Arroz ('spray', 'limit', 'elite', 'exuberant', 'destruction', 'present');
        var result = [];

        result = array.includes('spray');

        expect(result).toBe(true);
    });

    it('should iterate on each element and keep each value that pass the condition in the new array results', function () {
        var array = new Arroz ('spray', 'limit', 'elite', 'exuberant', 'destruction', 'present');
        var result = [];

        result = array.includes('spray', 1);

        expect(result).toBe(false);
    });

    it('should iterate on each element and keep each value that pass the condition in the new array results', function () {
        var array = new Arroz ('spray', 'limit', 'elite', 'exuberant', 'destruction', 'present');
        var result = [];

        result = array.includes('destruction', -5);

        expect(result).toBe(true);
    });

    it('should iterate on each element and keep each value that pass the condition in the new array results', function () {
        var array = new Arroz (1, 2, 3, 4, 5);
        var result = [];

        result = array.includes(1, -3);

        expect(result).toBe(false);
    });

    it('should iterate on each element and keep each value that pass the condition in the new array results', function () {
        var array = new Arroz (1, 2, 3, 4, 5);
        var result = [];

        result = array.includes(1, -10);

        expect(result).toBe(true);
    });

});