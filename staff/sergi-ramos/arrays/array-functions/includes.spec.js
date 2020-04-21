describe('includes', function () {
    it('should return true or false, sending it a string and a searchString per parameter', function () {
      
        var string = 'hola com esta avui';

        var boolean = includes(string, 'la');

        expect(boolean).toBe(true);
        
    });

    it('should return true or false, sending it a string, a searchString and a start position (position) by parameter', function () {
       
        var string = 'hola com esta avui';

        var boolean = includes(string, 'la',4);

        expect(boolean).toBe(false);
        
    });


    it('should return true or false, sending it a string, a searchString and a start position (position) by parameter', function () {
       
        var string = 'hola com esta avui';

        var boolean = includes(string, 'la',1);

        expect(boolean).toBe(true);
        
    });

    it('should return true or false, sending it a wrong string, a searchString and a start position (position) by parameter', function () {
       
        var string = 'hola com esta avui';

        var boolean = includes(string, 1 ,1);

        expect(boolean).toBe(false);
        
    });

});