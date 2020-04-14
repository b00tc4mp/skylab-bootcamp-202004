function indexOf(array, value, indexFrom) {
    if (indexFrom === undefined) {
      indexFrom = 0;
    }
    if (indexFrom < 0) {
      indexFrom = array.length + indexFrom;
    }
  
    for (var i = indexFrom; i < array.length; i++) {
      if (array[i] === value) {
        return i;
      }
    }
    return -1;
  }
  