  'use strict';

  describe('Arroz.prototype.some', function() {
      it('should check if the arroz have any element where the expresion is true', function() {
          var array = new Arroz(10, 10, 2, 30, 40);
          var result;

          result = array.some(function(element, index) {
              return element === index;
          });

          expect(result).toBe(true);
      });
      it('should return false if used in an empty arroz', function() {
          var array = new Arroz();
          var result;

          result = array.some(function(element, index) {
              return true;
          })
          expect(result).toBe(false);
      });
      it('should give an error when called without giving a callback parameter', function() {
          var array = new Arroz(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
          var result = false;
          try {
              result = array.some();
          } catch (error) {
              result = error;
          }

          expect(result.message).toBe("expression is not a function");
      });
  });