'use strict'

describe ('Arroz.prototype.pop', function(){
it('should iterate on each element throw find the value', function(){
    var array = new Arroz(1,2,3,4,5)
    var result = array.pop()

    expect(array.length).toBe(4)
    expect(result).toBe(5)

});

it('If the initial Value its less than 0 the count will start at Length - InitialValue', function(){

    var array = new Arroz(1,2,3,4,5);

    var result = array.indexOf(3, -4);

    expect(result).toBe(2)
});
    
it('If the array its empty it will return undefined', function(){

var array = new Arroz()
    
var result = array.pop()
    
expect(result).toBe(undefined)
});
});

it('Should throw undefined error if u put an string as expression', function(){
    var array = new Arroz(1,2,3,4)

    try{
    
    result = array.pop('d')
}catch(error) {
    var result = error
    }
 expect(result instanceof TypeError).toBeTruthy();
 expect(result.message).toBe('d is not defined')

});