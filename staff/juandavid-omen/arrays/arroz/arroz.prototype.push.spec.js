"use strict";
describe("Arroz.prototype.push", function () {
    it('should add elements into an empty instance', function () {
        var array = new Arroz();

        array.push(5);

        expect(array.length).toBe(1);
        expect(array[0]).toBe(5);
 
    });

    it("should return the new length on each addition", function () {
      var array = new Arroz();

      var length = array.push('juan');

      expect(length).toBe(array.length);
      expect(length).toBe(1);
      expect(array[0]).toBe('juan');
    });

    
    it("should add multiple values", function () {
      var array = new Arroz();

      var length = array.push("juan", "pepe", "Hector");

      expect(length).toBe(array.length);
      expect(length).toBe(3);
      expect(array[0]).toBe("juan");
      expect(array[1]).toBe("pepe");
      expect(array[2]).toBe("Hector");
    });
});