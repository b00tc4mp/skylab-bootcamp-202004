describe('arroz.prototype.reduce',function(){
    it('....', function(){

        var array = new Arroz(1,2,3,4);

        var accumulator = array.reduce(function(acc,currentVal){
            
            return acc+currentVal
        });


        expect(accumulator).toBe(10);

    });



    it('....', function(){

        var array = new Arroz(1,2,3,4);

        var accumulator = array.reduce(function(acc,currentVal){
            
            return acc+currentVal
        },10);


        expect(accumulator).toBe(20);

    });


    // it('....', function(){

    //     var array = new Arroz("hey","you","buddy");

    //     var accumulator = array.reduce(function(acc,currentVal){
            
    //         return acc+currentVal
    //     },10);


    //     expect(accumulator).toBe(20);

    // });
});



