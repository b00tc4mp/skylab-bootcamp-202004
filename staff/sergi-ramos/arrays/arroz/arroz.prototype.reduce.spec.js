describe('arroz.prototype.reduce',function(){
    it('should add all the numbers in an array with an accumulator', function(){

        var array = new Arroz(1,2,3,4);

        var accumulator = array.reduce(function(acc,currentVal){
            
            return acc+currentVal
        });


        expect(accumulator).toBe(10);

    });



    it('should add all the numbers in an array with an accumulator from a initial value', function(){

        var array = new Arroz(1,2,3,4);

        var accumulator = array.reduce(function(acc,currentVal){
            
            return acc+currentVal
        },10);


        expect(accumulator).toBe(20);

    });


     it('should add all the numbers in an array with an accumulator from a initial value', function(){

        var array = new Arroz('hola','mundo','pepito','!');

        var accumulator = array.reduce(function(acc,currentVal){
            
            return acc+currentVal
        },'¡');


        expect(accumulator).toBe('¡holamundopepito!');

    });
});



