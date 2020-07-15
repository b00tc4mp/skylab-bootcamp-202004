'use strict';

describe('ArrozConLeche', function () {

    it('it should instanciate an Arroz with length 0 on no arguments', function () {
        var array = new ArrozConLeche(new Arroz(1,2,3,4));

        expect(array.length).toBe(1);
    });

    it('it should throw error that a parameter is not an Arroz', function (){
        var array;
        var result;

        try{
            array = new ArrozConLeche(5);
            debugger
        }catch (error) {
            result = error; 
        }

        expect(result.message).toBe('5 is not an Arroz');
    });

    // it('...', function(){
    //     var array = new ArrozConLeche();
    //     array[1] = new Arroz(1,2,3);
        
    //     expect(array[1].length).toBe(3);
    //     expect(array.length).toBe(2);

    // })
});