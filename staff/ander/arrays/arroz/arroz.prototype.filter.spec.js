describe("filter", function () {
it("Should itereate on the array and return the value of the match", function () {

  var array = new Arroz (12, 5, 8, 130, 44)
  array.filter(function (value) {
    return value >= 10;
  });

    expect(array[0]).toBe(12);
    
});
});
  it("collect the error if we don't pass a function", function () {
  
    var array = new Arroz (12, 5, 8, 130, 44)
  
    expect( function(){array.filter()
        }).toThrowError(TypeError,"undefined is not a function");
        expect( function(){array.filter(1)
        }).toThrowError(TypeError,"1 is not a function");
  
  });
  
