function indexOf(array, searchValue, fromIndex) {
    if (fromIndex === undefined) fromIndex = 0;
    if (fromIndex < 0) fromIndex = array.length + fromIndex;
    if (fromIndex > array.length) return -1;
      for (var i = fromIndex; i < array.length; i++) {
        if (array[i] === searchValue) {
          return i;
        }
      }
      return -1;
    }