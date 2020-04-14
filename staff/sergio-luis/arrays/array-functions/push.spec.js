describe('push', function() {
    it('push nomal', function() {
        var array = []

        push(array, 4)
        push(array, 'Hola')

        expect(array[0]).toBe(4);
        expect(array[1]).toBe('Hola');

    });
    
    it('push more values', function() {
        var array = [4,5]

        push(array, 'hola','sergio')

        expect(array[0]).toBe(4);
        expect(array[1]).toBe(5);
        expect(array[2]).toBe('hola');
        expect(array[3]).toBe('sergio');
    });
});