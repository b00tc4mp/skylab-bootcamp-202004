'use strict'

describe ('Arroz.prototype.indexOf', function(){
it('should iterate on each element throw find the value', function(){
    var array = new Arroz(1,2,3,4,5)


var result = array.indexOf(2, 1)

expect(result).toEqual(1)


});

it('If the initial Value its less than 0 the count will start at Length - InitialValue', function(){

    var array = new Arroz(1,2,3,4,5);

    var result = array.indexOf(3, -4);

    expect(result).toBe(2)
});
it('The index to start the search at. If the index is greater than or equal to the arrays length, -1 ', function(){
    
    var array = new Arroz(1,2,3,4,5)
    var result = array.indexOf(3, 8)

    expect(result).toBe(-1)
});


it('if initialValue its undefined will iterate throw the start of arroz', function(){
    var array = new Arroz(1,2,3,4,5)
    var result=array.indexOf(4)

    expect(result).toBe(3);
});
});