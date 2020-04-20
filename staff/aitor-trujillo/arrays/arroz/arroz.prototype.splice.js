"use strict";

Arroz.prototype.splice = function (index, howmany) {
  if (index === undefined) index = 0;

  var arroz = new Arroz();

  // add until index
  for (var i = 0; i <= index; i++) {
    arroz[i] = this[i];
    arroz.length++;
  }

  // add arguments starting from index 2
  for (var k = 2; k < arguments.length; k++) {
    arroz[arroz.length] = arguments[k];
    arroz.length++;
  }
  //add from arguments (if has) to the end of the array
  for (var j = index + howmany + 1; j < this.length; j++) {
    arroz[arroz.length] = this[j];
    arroz.length++;
  }

  var deleted = new Arroz();
  for (var l = index + 1; l <= index + howmany; l++) {
    deleted[deleted.length] = this[l];
    deleted.length++;
  }

  var arrozLength = this.length;
  for (var n = 0; n < arrozLength; n++) {
    delete this[n];
    this.length--;
  }
  for (var m = 0; m < arroz.length; m++) {
    this[this.length] = arroz[m];
    this.length++;
  }

  return deleted;
};

// Array.prototype.splice = function (index, howmany) {
//     if (index === undefined) index = 0;
//   var arr = [];

//   // add until index
//   for (var i = 0; i <= index; i++) {
//     arr[i] = this[i];
//   }

//   // add arguments starting from index 3
//   for (var k = 3; k < arguments.length; k++) arr[arr.length] = arguments[k];

//   //add from arguments (if has) to the end of the this
//   for (var j = index + howmany + 1; j < this.length; j++) {
//     arr[arr.length] = this[j];
//   }

//   var deleted = [];
//   for (var l = index + 1; l <= index + howmany; l++)
//     deleted[deleted.length] = this[l];

//   this.length = 0;

//   for (var m = 0; m < arr.length; m++) {
//     this[this.length] = arr[m];
//   }

//   return deleted;
// }
