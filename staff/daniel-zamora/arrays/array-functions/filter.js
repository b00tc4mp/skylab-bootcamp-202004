// function filter(array, searchValue, index) {
//   var result = [];
//   if (index < 0) index = array.length + index;
//   if (index > array.length) return false;
//   if (index === undefined) index = 0;
//   for (var i = 0; i < array.length; i++) {
//     if (searchValue === array[i]) {
//       result[result.length] = array[i];
     
//     }
//   }
//   return result;
// }

function filter(array, expression) {
    var arr=[]
    for (var i = 0; i < array.length; i++){
        if(expression(array[i])){
         arr[arr.length]= array[i]; 
        }
    }
        
        return arr;
}




