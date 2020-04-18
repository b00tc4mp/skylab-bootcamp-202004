'use strict'

describe ('arroz.prototype.reduce', function(){
   it('Should operate trouth all the array returnig a single value', function(){
        var array = new Arroz (1,2,3,4,5,6)
        var result = array.reduce(function(accumulator,element){
            return accumulator + element
        
        
        })
        expect(result).toBe(21)

        var array = new Arroz (1,2,3,4,5)
        var result = array.reduce(function(accumulator,element){
            return accumulator * element
            
        })
  expect(result).toBe(120)
    }) 
it('If you apply an empty array and the initial value is different than undefined, it will return the initial value',function(){
    var array = new Arroz()
    var result = array.reduce(function(accumulator,element  ){
        return accumulator + element
    },2)
    expect(result).toBe(2)
}) 
it('If you apply an empty array and no initial Value it will throw a TypeError',function(){
    var array = new Arroz()
    var result;  
    try {
    array.reduce(function(accumulator,element){
        return accumulator + element })
    }catch(error){
       result = error
    }
    
   
expect(result instanceof TypeError).toBeTruthy()
expect(result.message).toBe('reduce of empty array with no initial value')
    
    

})
it('If you not pass a function a type error will be throw',function(){
    var array = new Arroz (1,2,3,4)
    var result;
    try{
        array.reduce(true,2)
    }catch(error){
        result = error
    }
expect(result instanceof TypeError).toBeTruthy()
expect(result.message).toBe('true is not a function')


})
})