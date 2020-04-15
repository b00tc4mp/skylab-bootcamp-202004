'use strict';

describe('Arroz.prototype.splice', function () {
    it('should insert an element inside the arroz', function () {
        var arroz = new Arroz(0,1,2,3,4,5,6,7,8,9);
        var begin=3;
        var insert=10;
        var length=0;
        
        
        arroz.splice(begin,length,insert);

        expect(arroz[3]).toBe(10);
    });
    it('should add and replace', function () {
        var arroz = new Arroz("Jan","March","April","June");
        var begin=1;
        var insert="Feb";
        var length=0;
        
        arroz.splice(begin,length,insert);

        expect(arroz[1]).toBe("Feb");
        arroz.splice(4,1,"May");
        expect(arroz[4]).toBe("May");
    });
    it('should work when adding multiple elements', function () {
        
        var arroz = new Arroz("Lunes","Jueves","Viernes","Sabado");
        var begin=1;
        var insert=new Arroz("Martes","Miercoles");
        var length=0;
        
        arroz.splice(begin,length,insert);

        expect(arroz[0]).toBe("Lunes");
        expect(arroz[1]).toBe("Martes");
    });
    it('should accpet a negative starting point', function () {
        var arroz = new Arroz(0,1,2,3,4,5,6,7,8,9);
        var begin=-2;
        var insert=10;
        var length=0;
        
        
        arroz.splice(begin,length,insert);

        expect(arroz[8]).toBe(10);
    });
    it('should give an error when called without giving a start or length parameters', function () {
        var arroz = new Arroz(0,1,2,3,4,5,6,7,8,9);
        var begin=-2;
        var _error;
        try{
            arroz.splice();
        }catch(error){
            _error=error;
        }
        
        expect(_error.message).toBe("start is not an integer");
        try{
            arroz.splice(begin);
        }catch(error){
            _error=error;
        }
        expect(_error.message).toBe("span is not an integer");
        
    });
    
});