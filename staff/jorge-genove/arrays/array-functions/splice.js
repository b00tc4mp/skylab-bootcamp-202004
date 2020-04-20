function splice(arrayTo,start, deleteCount, addItem){


    if (start>arrayTo.length){
        start = arrayTo.length;
        deleteCount = 0;
    }
    else if(start <0){
        start = arrayTo.length + start
        if(start<0){
            start = 0;
        };
    }
    if(arguments.length <3 || arrayTo.length - start < deleteCount){
        deleteCount = arrayTo.length - start;
    }
    if(deleteCount <0){
        deleteCount = 0;
    }

    var newArray = [];

    for(var i=0; i<start; i++){
        newArray[newArray.length] = arrayTo[i];
    }
    if(arguments.length>3){
        for(var i = 3; i<arguments.length; i++){
            newArray[newArray.length] = arguments[i];
        }
    }

    for(i = start+deleteCount; i<arrayTo.length; i++){
        newArray[newArray.length] = arrayTo[i];
    }
    arrayTo.length = 0;
    for (var i =0; i<newArray.length; i++){
        arrayTo[arrayTo.length] = newArray[i]
    }


   
    
};


/* 
[1,0, 'feb']    

for (var i = initialIndex; i <= deleteCount; i++){
        array[initialIndex] = addItem
    }
    for (var i = initialIndex; i < deleteCount; i++){
        result[result.length] = array[i]
    }



*/


// function splice(array,initialIndex){
//     var result = [];
//     var cont = 0;
    
//     if(deleteCount === undefined && addItem === undefined){
//     for(var i= 0; i<array.length;i++){
//             if(i>=initialIndex){
//                 result[result.length] = array[i]
//             }
//             array[cont] = array[i]

//         }
//     }
   
// }

// const months = ['Jan', 'March', 'April', 'June'];
// months.splice(1, 0, 'Feb');
// // inserts at index 1
// console.log(months);
// // expected output: Array ["Jan", "Feb", "March", "April", "June"]

// months.splice(4, 1, 'May');
// // replaces 1 element at index 4
// console.log(months);
// // expected output: Array ["Jan", "Feb", "March", "April", "May"]
// xamples
// Remove 0 (zero) elements before index 2, and insert "drum"
// let myFish = ['angel', 'clown', 'mandarin', 'sturgeon']
// let removed = myFish.splice(2, 0, 'drum')

// // myFish is ["angel", "clown", "drum", "mandarin", "sturgeon"] 
// // removed is [], no elements removed
// Remove 0 (zero) elements before index 2, and insert "drum" and "guitar"
// let myFish = ['angel', 'clown', 'mandarin', 'sturgeon']
// let removed = myFish.splice(2, 0, 'drum', 'guitar')

// // myFish is ["angel", "clown", "drum", "guitar", "mandarin", "sturgeon"] 
// // removed is [], no elements removed
// Remove 1 element at index 3
// let myFish = ['angel', 'clown', 'drum', 'mandarin', 'sturgeon']
// let removed = myFish.splice(3, 1)

// // removed is ["mandarin"]
// // myFish is ["angel", "clown", "drum", "sturgeon"] 
// Remove 1 element at index 2, and insert "trumpet"
// let myFish = ['angel', 'clown', 'drum', 'sturgeon']
// let removed = myFish.splice(2, 1, 'trumpet')

// // myFish is ["angel", "clown", "trumpet", "sturgeon"]
// // removed is ["drum"]
// Remove 2 elements from index 0, and insert "parrot", "anemone" and "blue"
// let myFish = ['angel', 'clown', 'trumpet', 'sturgeon']
// let removed = myFish.splice(0, 2, 'parrot', 'anemone', 'blue')

// // myFish is ["parrot", "anemone", "blue", "trumpet", "sturgeon"] 
// // removed is ["angel", "clown"]
// Remove 2 elements from index 2
// let myFish = ['parrot', 'anemone', 'blue', 'trumpet', 'sturgeon']
// let removed = myFish.splice(2, 2)

// // myFish is ["parrot", "anemone", "sturgeon"] 
// // removed is ["blue", "trumpet"]
// Remove 1 element from index -2
// let myFish = ['angel', 'clown', 'mandarin', 'sturgeon']
// let removed = myFish.splice(-2, 1)

// // myFish is ["angel", "clown", "sturgeon"] 
// // removed is ["mandarin"]
// Remove all elements after index 2 (incl.)
// let myFish = ['angel', 'clown', 'mandarin', 'sturgeon']
// let removed = myFish.splice(2)

// // myFish is ["angel", "clown"]
// // removed is ["mandarin", "sturgeon"]