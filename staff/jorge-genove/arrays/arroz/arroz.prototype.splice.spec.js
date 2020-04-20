'use strict'


describe("Arroz.prototype.splice", function(){
     it ('Should transform an array in one only value', function(){
        var array = new Arroz (1,3,5,6,7,8,9)

       var result = array.splice(2,3,'pepito','grillo')

        expect(array[2]).toBe('pepito')
        expect(array.length).toBe(6)
        expect(result.length).toBe(3)
        expect(result).toEqual([5,6,7]) 

    }) 
   
it ('If deleteCount its 0 or less than 0 it must no erese elements and return and empty array,the new elements must be added at the index position in the original array', function(){
    var array = new Arroz (1,2,3,4,5,6,7,8,9,10)
    var result = array.splice(3,0,'pepito', 'grillo')

    expect(result.length).toBe(0)
    expect(array.length).toBe(12)
    expect(array[3]).toBe('pepito')
    expect(result).toEqual([])
}) 
it ('if deleteCount its bigger than length until startIndex and arroz length it will delete until array length', function(){
    var array = new Arroz (1,2,3,4,5,6,7,8)
    var result = array.splice(2,8,'Pikachu')
    expect(array.length).toBe(3)
    expect(array[2]).toBe('Pikachu')
    expect(result.length).toBe(6)
    expect(result).toEqual([3,4,5,6,7,8])

})
it ('if you declare  a not number values for startIndex and deleteCount values his value will be 0', function() {
var array = new Arroz (1,2,3,4,5,6)
var result = array.splice('d',3)
expect(result.length).toBe(3)
expect(result).toEqual([1,2,3])
})

})
