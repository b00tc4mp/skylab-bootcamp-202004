'use strict';

describe('Arroz.from', function () {
    it('should instanciate an Arroz with length an arguments equal to the array is used with', function () {
        var array = new Array(1,2,3,4,5,6,7,8,9);
        var arroz= Arroz.from(array);

        expect(arroz.length).toBe(array.length);
        for(var i=0;i<array.length;i++){
            expect(arroz[i]).toBe(array[i]);
        }
    });
    it('should instanciate an Arroz an give it one value for each letter in a string', function () {
        var value = "hola mundo";
        var arroz= Arroz.from(value);

        expect(arroz.length).toBe(value.length);
        for(var i=0;i<value.length;i++){
            expect(arroz[i]).toBe(value[i]);
        }
    });
    it('should not change the array is being used with', function () {
        var value = [1,2,3,4,5,6,7,8,9];
        var copy= value;
        var arroz= Arroz.from(value);

        expect(copy.length).toBe(value.length);
        for(var i=0;i<value.length;i++){
            expect(copy[i]).toBe(value[i]);
        }
    });
    it('should return an empty arroz when used alone', function () {
        var arroz= Arroz.from();

        expect(arroz.length).toBe(0);
    });
    it('should return an arroz whith length 1 whn used with a number', function () {
        
        var arroz= Arroz.from(5);

        expect(arroz.length).toBe(1);
        expect(arroz[0]).toBe(5)
    });
});