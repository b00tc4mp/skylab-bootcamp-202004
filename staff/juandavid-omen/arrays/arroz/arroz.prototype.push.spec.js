"use strict";
describe("Arroz.prototype.push", function() {
    it('should add elements into an empty instance', function() {
        var array = new Arroz();

        array.push(5);

        expect(array.length).toBe(1);
        expect(array[0]).toBe(5);
 
    });

    it("should return the new length on each addition", function() {
      var array = new Arroz();

      var length = array.push(1);

      expect(length).toBe(array.length);
      expect(length).toBe(1);
      expect(array[0]).toBe(1);
    });

    
    it("should add multiple values", function() {
      var array = new Arroz();

      var length = array.push(4, 7, 8);

      expect(length).toBe(array.length);
      expect(length).toBe(3);
      expect(array[0]).toBe(4);
      expect(array[1]).toBe(7);
      expect(array[2]).toBe(8);
    });

  it("should throw an error when not numeric arguments", function () {
    var array = new Arroz();

    expect(function () {  
      array.push(true, 'e', '8');
    }).toThrowError(TypeError, 'true must be numeric');
  });
});