 'use strict'
 
 describe("Arroz.prototype.slice", function () {
    it("should iterate by the begin item to the end item, and return the values in a new array", function () {
    var array = new Arroz(1, 3, 5, 6, 7, 8, 65, 4, 3, 2, 3, 4, 5);

    var result = array.slice(2, 6);
    expect(result[0]).toBe(5);
    expect(result[2]).toBe(7);
  }); 
 
  it("if the begin or end number are less than 0 it must start the count by the end of the array", function () {
    var array = new Arroz(1, 3, 5, 4, 3, 2, 323, 24, 4, 5, 2, 3, 6);

    var result = array.slice(-8, 9);
    var result2 = array.slice(4, -2);

    expect(result[1]).toBe(323);
    expect(result2[1]).toBe(2);
  }); 
  


it("if the end parameter its undefined or bigger than the length of the arroz it must slice until the final of the arroz", function() {
    var array = new Arroz(1,2,3,4,5);

   var result = array.slice(2, 9)
    var result2 = array.slice(2)

    expect(result.length).toBe(3) 
    expect(result2.length).toBe(3)
})  


it (" if the  first argument its not a number it will start at index 0 ", function(){
  var array = new Arroz(1,2,3,4,5,6)

  var result = array.slice('d', 3)

  expect(result.length).toBe(3)
})

it ("if the las paramater its a string it will return an empty array", function() {
  var array = new Arroz(1,2,3,4,5,6)

  var result = array.slice(3,'d')

  expect(result.length).toBe(0)

})

});

