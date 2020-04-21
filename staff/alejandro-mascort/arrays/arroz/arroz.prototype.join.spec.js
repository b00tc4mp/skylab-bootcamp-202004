'use strict';

describe('Arroz.prototype.join', function () {
    it('should return the string 1,2,3 because no separator is specified', function () {
        var array = new Arroz(1, 2, 3);

        var result= array.join();

        expect(result).toBe("1,2,3");
    });

    it('should return the string "1 2 3" because no separator is specified', function () {
        var array = new Arroz(1, 2, 3);

        var result= array.join(" ");

        expect(result).toBe("1 2 3");
    });

    it('should return the string "" because the array is empty', function () {
        var array = new Arroz();

        var result= array.join( " ");

        expect(result).toBe("");
    });

    it('should return the string "1function(x){}2function(x){}3" because the separator is function(x){}', function () {
        var array = new Arroz(1, 2, 3);

        var result= array.join(function(x){});

        expect(result).toBe("1function(x){}2function(x){}3");
    });
});