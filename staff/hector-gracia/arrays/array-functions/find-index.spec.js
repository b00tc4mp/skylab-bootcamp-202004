describe('find-index', function () {
    it('should add one or more elements to the end of an array and returns the new length of the array', function () {
        var array = [1,2,3,4,5]
        var condition = function(){
            for (var i=0; i<array.length; i++){
                if (array[i]>3){
                return i;
                } else if(array.length-1==i){
                return -1;
                }
            }
        }
        var result= findIndex(array, condition)

        expect(result).toBe(3);
    });

    it('should iterate on each element and keep each value in upper-case in a new external array', function () {
        var array = ['hello', 'biatch', 'world'];
        var condition = function(){
            for(var i=0; i<array.length; i++){
                if(array[i].length>5){
                    return i;
                } else if(array.length-1==i){
                    return -1;
                }
            }
        }

        var result= findIndex(array, condition)

        expect(result).toBe(1);
    });
});