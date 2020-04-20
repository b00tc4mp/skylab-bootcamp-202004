describe('includes', function () {
    it('includes return a bollean', function () {
        var array = [5,2,1];

        var result1 = includes(array,2);
        var result2 = includes(array,6);

        expect(result1).toBe(true);
        expect(result2).toBe(false);
    });
    it('includes test with string an with fromIndex return a bollean', function () {
        var array = ['Hola','que','Tal'];

        var result1 = includes(array,'que',3);
        var result2 = includes(array,'Hola',-1);

        expect(result1).toBe(false);
        expect(result2).toBe(true);
    });

});