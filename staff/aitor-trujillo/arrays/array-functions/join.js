"use strict";

function join(array, separator = ",") {
  if (typeof separator === "undefined") separator = ",";
  var stringed = "";
  for (var i = 0; i < array.length; i++) {
    if (i !== array.length - 1) stringed += `${array[i]}` + separator;
    else stringed += `${array[i]}`;
  }
  return stringed;
}
