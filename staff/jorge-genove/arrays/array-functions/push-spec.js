
describe('push', function () {
    it('push nomal', function () {
    var array = []
    
    push(array, 4)
    push(array, 'Hola')
        
    expect(array[0]).toBe(4);
    expect(array[1]).toBe('Hola');

    });
    it('push return lenght', function () {
        var array = []
        
        push(array, 4)
        push(array, 'Hola')
            
        expect(array.length).toBe(2);
        });
});
