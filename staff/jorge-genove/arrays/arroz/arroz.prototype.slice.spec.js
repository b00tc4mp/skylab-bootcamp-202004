describe ('Arroz.prototype.slice', function () {
    it ('should iterate by the begin item to the end item, and return the values in a new array', function(){
var array = new Arroz(1,3,5,6,7,8,65,4,3,2,3,4,5)

var result = array.slice(2,6)
    expect(result[0]).toBe(5)
    expect(result[2]).toBe(7)
    })
})
    
