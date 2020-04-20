function some(array, callback) {
  var control = false;
  if (array.length === 0){
      return control
  }
  for (var i in array) {
    if(callback(array[i])){
       control = true;
    }
  }
  return control
}
