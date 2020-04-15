// TODO
describe('map', function(){
it('should iterate on each element and return a new variable with the element multiply by them self plus 1', function(){
    var array = [2,4,6];
    var result = [];

<<<<<<< Updated upstream
    map(array, function(element, index){
        result[index] = element * element+1;
=======
    result = map(array, function(element){
       return element * element+ 1;
>>>>>>> Stashed changes
    });
    expect(result[0]).toBe(5);
    expect(result[1]).toBe(17);
    expect(result[2]).toBe(37);
});
<<<<<<< Updated upstream
=======
describe('map', function(){
    it('should iterate on each element and return a new variable with all the elements x 3', function(){
        var array = [2,4,6];
        var result = [];
    
        result = map(array, function(element, index){
          return  element * 3;
        });
        expect(result[0]).toBe(6);
        expect(result[1]).toBe(12);
        expect(result[2]).toBe(18);

});

});
>>>>>>> Stashed changes

});