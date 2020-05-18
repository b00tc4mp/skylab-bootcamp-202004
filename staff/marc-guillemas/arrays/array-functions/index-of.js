function indexOf(array, searchValue, index) {
    if (index < 0) index = array.length + index;
    if (index > array.length) return -1;
    if (index === undefined) index = 0;
    var i = index;
    for (i; i < array.length; i++) {
      if (array[i] === searchValue) {
        return i;
      }
    }
    return -1;
  }
  
  
  