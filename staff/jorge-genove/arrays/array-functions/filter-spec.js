describe('filter', function () {
    it('filter a array and return an new array', function () {
        var array = [5,2,1];

        var newArray = filter(array, function(element){
            return element < 4;
        });

        expect(newArray[0]).toBe(2);
        expect(newArray[1]).toBe(1);
    });
    it('filter a array and return -1 if no find coincidence', function () {
        var array = ['Hola','que','Tal'];
        var newArray = filter(array, function(element){
            return element.length > 5;
        });
        expect(newArray).toBe(-1);
    });
    it('filter a array is empty return -1 if no find coincidence', function () {
        var array = [];
        var newArray = filter(array, function(element){
            return element.length > 5;
        });
        expect(newArray).toBe(-1);
    });
});