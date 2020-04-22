function every(array, expression) {

  for (var i = 0; i < array.length; i++) {
    if (!expression(array[i])) {
      return false;
    }  
  }
   return true;
}
