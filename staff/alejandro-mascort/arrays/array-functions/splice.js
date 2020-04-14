function splice(array, startingIndex, deleteCount, ...arguments) {
    var copyArray = [];
    var newArray = [];
    var index = 0;
    var values = [...arguments];
    
    if (!startingIndex) {
        startingIndex = 0;
    } else if (startingIndex < 0) {
        startingIndex = startingIndex + array.length;
        
        if (startingIndex < 0) {
            startingIndex = 0;
        }
    } else if (startingIndex > array.length) {
        startingIndex = array.length;
    }

    
    if (deleteCount <= 0) {
        for (var i = startingIndex; i < array.length; i++) {
            copyArray[index] = array[i];
            index++;
        }

        index = 0;

        array.length = startingIndex;

        for (var i = 0; i < values.length; i++) {
            array[startingIndex+i] = values[i];
        }
        
        var arrLength = array.length;

        for (var i = 0; i < copyArray.length; i++) {
            array[arrLength+i] = copyArray[i];
        }
        

    } else {

        if (!deleteCount || (array.length - startingIndex) <= deleteCount) {
            deleteCount = array.length;

            for (var i = startingIndex; i < deleteCount; i++) {
                newArray[index] = array[i];
                index++;
            }
    
            array.length = startingIndex;

        } else {

            for (var i = startingIndex + deleteCount; i < array.length; i++) {
                copyArray[index] = array[i];
                index++;
            }

            index = 0;

            for (var i = startingIndex; i < startingIndex+deleteCount; i++) {
                newArray[index] = array[i];
                index++;
            }

            array.length = startingIndex;

            var arrLength = array.length;
            
            for (var i = 0; i < copyArray.length; i++) {
                array[arrLength+i] = copyArray[i];
            }
        }

        return newArray;
    }

}


