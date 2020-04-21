describe('join', function() {
    it('The join() method creates and returns a new string by concatenating all of the elements in an array (or an array-like object), separated by commas or a specified separator string. If the array has only one item, then that item will be returned without using the separator.', function() {
        var array = ['hola', 'esto','es', 'una', 'prueba', 2];

        var result1 = join(array,)
        var result2 = join(array,'')
        var result3 = join(array,'-')

        expect(result1).toBe('hola,esto,es,una,prueba,2');
        expect(result2).toBe('holaestoesunaprueba2');
        expect(result3).toBe('hola-esto-es-una-prueba-2');
    });

});