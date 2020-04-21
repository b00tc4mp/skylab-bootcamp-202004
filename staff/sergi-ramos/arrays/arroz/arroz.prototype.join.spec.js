'use strict'

describe('aroz.prototype.join', function () {
    it('create a string with the separator indicated by parameter', function () {

        var array = new Arroz(1, 2, 3, 4, 5);
        var string = array.join(', ');
        var string2 = array.join('- ');
        var string3 = array.join(' hola mundo ');
        var string4 = array.join('--');
        var string5 = array.join('');

        expect(string).toBe('1, 2, 3, 4, 5');
        expect(string2).toBe('1- 2- 3- 4- 5');
        expect(string3).toBe('1 hola mundo 2 hola mundo 3 hola mundo 4 hola mundo 5');
        expect(string4).toBe('1--2--3--4--5');
        expect(string5).toBe('12345');
    });

    it('create a string with the separator indicated by parameter it may not be a string', function () {

        var array = new Arroz(1, 2, 3, 4, 5);
        var string = array.join(true);
        var string2 = array.join(1);
        var string3 = array.join(undefined);
        var string4 = array.join(false);

        expect(string).toBe('1true2true3true4true5');
        expect(string2).toBe('112131415');
        expect(string3).toBe('1undefined2undefined3undefined4undefined5');
        expect(string4).toBe('1false2false3false4false5');

    });

    it('if there is no parameter, by default the elements will be separated by a comma', function () {

        var array = new Arroz(1, 2, 3, 4, 5);
        var string = array.join();

        expect(string).toBe('1, 2, 3, 4, 5');

    });

});