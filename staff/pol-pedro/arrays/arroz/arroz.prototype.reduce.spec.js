describe('reduce', function () {

    it('should iterate on each element and return the result of the operation define in the callback function, exemple with Arroz of strings ', function () {
        var array = new Arroz ('spray', 'limit', 'elite');
        var result;

        result = array.reduce(function(acc, cur){ return acc + cur;});

        expect(result).toBe('spraylimitelite');
    });

    it('should iterate on each element and return the result of the operation define in the callback function, exemple with Arroz of numbers', function () {
        var array = new Arroz (1, 2, 3);
        var result;

        result = array.reduce(function(acc, cur){ return acc + cur;});

        expect(result).toBe(6);
    });

    it('should iterate on each element and return the result of the operation define in the callback function, exemple with Arroz of numbers and a initial value', function () {
        var array = new Arroz (1, 2, 3);
        var result;

        result = array.reduce(function(acc, cur){ return acc + cur;}, 4);

        expect(result).toBe(10);
    });

    it('should iterate on each element and return the result of the operation define in the callback function, exemple with booleans', function () {
        var array = new Arroz (true, false, true, true);
        var result;

        result = array.reduce(function(acc, cur){ return acc + cur;});

        expect(result).toBe(3);
    });

    it('should iterate on each element and return the result of the operation define in the callback function, exemple with booleans', function () {
        var array = new Arroz (true, 2, 'hello');
        var result;

        result = array.reduce(function(acc, cur){ return acc + cur;});

        expect(result).toBe('true2hello');
    });


});