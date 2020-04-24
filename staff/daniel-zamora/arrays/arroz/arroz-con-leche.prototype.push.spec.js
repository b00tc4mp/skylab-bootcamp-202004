'use strict'

describe('ArrozConLeche.prototype.push', function () {
    it('Should add a new Arroz at the end of the actual array', function () {
        var array = new ArrozConLeche(new Arroz(1,2,3));

        array.push(new Arroz(4,5,6));

        expect(array.length).toBe(2);
        expect(array[0][0]).toBe(1);
        expect(array[0][1]).toBe(2);
        expect(array[0][2]).toBe(3);
        expect(array[1][0]).toBe(4);
        expect(array[1][1]).toBe(5);
        expect(array[1][2]).toBe(6);

    });



    it('Should return a error once we tried to add an array wothout using the method new Arroz', function(){
        var array = new ArrozConLeche();
        var result;

        try {
            array.push(3, 4, 5);
        } catch (error) {
            result = error;
        }

        expect(result.message).toBe('3 is not an Arroz');

    });

    it('Should add an empty array to the end of the array.', function () {
        var array = new ArrozConLeche(new Arroz(1, 2, 3), new Arroz());

        array.push(new Arroz());

        expect(array.length).toBe(3);
        expect(array[0][0]).toBe(1);
        expect(array[0][1]).toBe(2);
        expect(array[0][2]).toBe(3);
        expect(array[1][0]).toBe(undefined);
        expect(array[2][0]).toBe(undefined);

    });
});
