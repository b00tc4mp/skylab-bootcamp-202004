'use strict'

describe ('Arroz.prototype.pop', function(){
it('should iterate on each element throw find the value', function(){
    var array = new Arroz(1,2,3,4,5)
    var result = array.pop()

    expect(array.length).toBe(4)
    expect(result).toBe(5)

});
  
it('If the array its empty it will return undefined', function(){

var array = new Arroz()
    
var result = array.pop()
    
expect(result).toBe(undefined)

});

});