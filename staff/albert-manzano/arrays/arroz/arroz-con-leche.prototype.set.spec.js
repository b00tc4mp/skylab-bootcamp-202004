'use strict'

describe('ArrozConLechec.prototype.set', function () {
    it('should add hola mundo at postion 10',function(){
        var a = new ArrozConLeche(new Arroz(1, 2, 3), new Arroz('a', 'b', 'c', 'd'), new Arroz(true, true, false, false, false));
        a.set(10, undefined, new Arroz('hola mundo'));

        expect(a[10][0]).toBe('hola mundo');
        expect(a.length).toBe(11);
    });

    it('should add hola mundo at postion 20',function(){
        var a = new ArrozConLeche(new Arroz(1, 2, 3), new Arroz('a', 'b', 'c', 'd'), new Arroz(true, true, false, false, false));
        a.set(20, 20, 'hola mundo')

        expect(a[20][20]).toBe('hola mundo');
        expect(a.length).toBe(21);
    });

    it('should turn 0,0 to undefined',function(){
        var a = new ArrozConLeche(new Arroz(1, 2, 3), new Arroz('a', 'b', 'c', 'd'), new Arroz(true, true, false, false, false));
        a.set(0, 0, undefined)

        expect(a[0][0]).toBe(undefined);
        expect(a.length).toBe(3);
    });

    it('thrown Errors',function(){
        var a = new ArrozConLeche(new Arroz(1, 2, 3));
        

        expect(function () {
            a.set('a',1,"hola mundo")
        }).toThrowError(TypeError,+ 'is not a number');

        var a = new ArrozConLeche(new Arroz(1, 2, 3));

        expect(function () {
            a.set(1,true,"hola mundo")
        }).toThrowError(TypeError,+ 'is not a number');
    });
});
