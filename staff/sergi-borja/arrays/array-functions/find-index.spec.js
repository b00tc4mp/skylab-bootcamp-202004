describe('find-index', function () {
    it('returns the index of the first number of the array which accomplish the condition', function () {
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

    it('returns the index of the first number of the array which accomplish the condition', function () {
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