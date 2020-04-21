function splice(array, startingIndex, deleteCount) {
    var copyArray = [];
    var newArray = [];
    if (arguments.length > 3) {
        var values = [];

        for (var i=3; i < arguments.length; i++) values[values.length] = arguments[i];
    }
    
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
            copyArray[copyArray.length] = array[i];
        }

        array.length = startingIndex;

        for (var i = 0; i < values.length; i++) {
            array[startingIndex+i] = values[i];
        }
        
        addAtTheEnd();
    } else {

        if (!deleteCount || (array.length - startingIndex) <= deleteCount) {
            deleteCount = array.length;

            for (var i = startingIndex; i < deleteCount; i++) {
                newArray[newArray.length] = array[i];
            }
    
            array.length = startingIndex;

        } else {

            for (var i = startingIndex + deleteCount; i < array.length; i++) {
                copyArray[copyArray.length] = array[i];
            }

            for (var i = startingIndex; i < startingIndex+deleteCount; i++) {
                newArray[newArray.length] = array[i];
            }

            array.length = startingIndex;

            addAtTheEnd();
        }

        return newArray;
    }

    function addAtTheEnd() {
        var arrLength = array.length;

        for (var i = 0; i < copyArray.length; i++) 
            array[arrLength+i] = copyArray[i];
    }

}


