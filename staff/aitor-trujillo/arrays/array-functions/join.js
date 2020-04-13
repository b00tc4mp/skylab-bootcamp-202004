function myJoin(array, separator = ",") {
  var stringed = "";
  for (var i = 0; i < array.length; i++) {
    if (i !== array.length - 1) stringed += `${array[i]}` + separator;
    else stringed += `${array[i]}`;
  }
  return stringed;
}
