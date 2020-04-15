function splice(arr, start, end) {

  var initial = [];
  var deleted = [];
  var final = [];

  for (var i = 0; i < arr.length; i++) {
    if (i < start) {
      initial[initial.length] = arr[i];
    }

    if (i >= start && i < end) {
      deleted[deleted.length] = arr[i];
    }

    if (i >= end) {
      final[final.length] = arr[i];
    }
  }

  arr.length = 0;
  for (var i = 0; i < initial.length; i++) arr[arr.length] = initial[i];
  for (var i = 3; i < arguments.length; i++) arr[arr.length] = arguments[i];
  for (var i = 0; i < final.length; i++) arr[arr.length] = final[i];

  return deleted;
}