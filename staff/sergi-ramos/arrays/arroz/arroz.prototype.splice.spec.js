'use strict'

describe('arroz.prototype.splice',function(){
   
    it('test with a single parameter, it should return an array with the elements removed and modify the original array from the start paramete', function(){

        var array = new Arroz(1,2,3,4);
        var a = array.splice(1);

        expect(array.length).toBe(1);
        expect(array[0]).toBe(1);
        expect(a).toEqual([2,3,4]);
        expect(a[0]).toBe(2);
        expect(a[1]).toBe(3);
        expect(a[2]).toBe(4);
    });
   
    it('test with two parameters, it should return an array with the elements deleted and modify the original array from the parameters start (position) and deleteCount (number of elements deleted)', function(){

        var array = new Arroz(1,2,3,4);

        var a = array.splice(1,2);

        expect(array.length).toBe(2);
        expect(array[0]).toBe(1);
        expect(array[1]).toBe(4);
        expect(a).toEqual([2,3]);
    });

    it('from the start position you must add the elements indicated as parameters', function(){

        var array = new Arroz(1,2,3,4);
        var array2 = new Arroz(1,2,3,4);
        var a = array.splice(1,2,'hola','mundo','cruel','!!!!');
        var b = array2.splice(1,1,'hola');

        expect(array.length).toBe(6);
        expect(array[0]).toBe(1);
        expect(array[1]).toBe('hola');
        expect(array[2]).toBe('mundo');
        expect(array[3]).toBe('cruel');
        expect(array[4]).toBe('!!!!');
        expect(array[5]).toBe(4);
        expect(a[0]).toBe(2);
        expect(a[1]).toBe(3);
        expect(array2[0]).toBe(1);
        expect(array2[1]).toBe('hola');
        expect(array2[2]).toBe(3);
        expect(array2[3]).toBe(4);
        
    });
});