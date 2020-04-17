describe("Arroz.prototype.splice", function(){
    it ('Should transform an array in one only value', function(){
        var array = new Arroz (1,3,5,6,7,8,9)

       var result = array.splice(2,3,'pepito','grillo')

        expect(array[2]).toBe('pepito')
        expect(array.length).toBe(6)
        expect(result.length).toBe(3) 

    })
   
it ('If deleteCount its 0 or less than 0 it must no erese elements and return and empty array', function(){
    var array = new Arroz (1,2,3,4,5,6,7,8,9,10)
    var result = array.splice(3,0,'pepito', 'grillo')

    expect(result.length).toBe(0)
    expect(array.length).toBe(10)
})


})
