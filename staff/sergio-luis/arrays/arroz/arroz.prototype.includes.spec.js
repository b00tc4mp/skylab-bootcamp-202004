"use estrict";

describe('Arroz.prototype.includes', function() {
    it('includes return a bollean if find return true', function() {
        var array = new Arroz(5, 2, 1);
        var result1 = array.includes(2);
        var result2 = array.includes(6);

        expect(result1).toBe(true);
        expect(result2).toBe(false);
    });
    it('includes test with string an with fromIndex return a bollean', function() {
        var array = new Arroz('Hola', 'que', 'Tal');
        var result1 = array.includes('que', 3);
        var result2 = array.includes('Hola', -1);

        expect(result1).toBe(false);
        expect(result2).toBe(true);
    });
    it('If you don`t pass any arguments to includes sould return undefined', function() {
        var array = new Arroz('Hola', 'que', 'Tal');
        var result = array.includes();

        expect(result).toBe(undefined);
    });
});