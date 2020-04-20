describe('includes', function () {
    it('it should return true', function () {    
        var array = [1, 5, 8];

        var a = includes(array, 1);

        expect(a).toBe(true);
    });

    it('it should return true', function () {
        var array = ['hola', 'saludo', 'sol'];

        var a = includes(array, 'sol');

        expect(a).toBe(true);
    });

    it('it should return false', function () {
        var array = [1, 5, 8];

        var a = includes(array, 2);

        expect(a).toBe(false);
    });

    it('it should return true', function () {
        var array = [1, 2, 3, 1, 5, 6, 1, 8];

        var a = includes(array, 1, 2);

        expect(a).toBe(true)
    });

    it('it should return false', function () {
        var array = [1, 2, 3, 1, 5, 6, 1, 8];

        var a = includes(array, 2, 4);
        
        expect(a).toBe(false);
    });

})