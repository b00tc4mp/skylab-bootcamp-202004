console.log('put water to boil', new Date)
setTimeout(() => console.log('water is boiling', new Date), 1000)

console.log('put oil to warm', new Date)
setTimeout(() => console.log('oil is hot', new Date), 100)

console.log('cut onion', new Date)
var before = Date.now()
while (Date.now() - before < 2000);
console.log('end cutting onion', new Date)

console.log('cut garlic', new Date)
var before = Date.now()
while (Date.now() - before < 3000);
console.log('end cutting garlic', new Date)

// put water to boil Fri Apr 24 2020 11:56:31 GMT+0200 (Central European Summer Time)
// put oil to warm Fri Apr 24 2020 11:56:31 GMT+0200 (Central European Summer Time)
// cut onion Fri Apr 24 2020 11:56:31 GMT+0200 (Central European Summer Time)
// end cutting onion Fri Apr 24 2020 11:56:33 GMT+0200 (Central European Summer Time)
// cut garlic Fri Apr 24 2020 11:56:33 GMT+0200 (Central European Summer Time)
// end cutting garlic Fri Apr 24 2020 11:56:36 GMT+0200 (Central European Summer Time)

// oil is hot Fri Apr 24 2020 11:56:36 GMT+0200 (Central European Summer Time)
// water is boiling Fri Apr 24 2020 11:56:36 GMT+0200 (Central European Summer Time)

///

setInterval(() => {
    console.log('hola mundo', new Date)
    
    // loong synchronous processing
    const before = Date.now()
    while(Date.now() - before < 200);
}, 1000)

// hola mundo Fri Apr 24 2020 12:03:04 GMT+0200 (Central European Summer Time)
// hola mundo Fri Apr 24 2020 12:03:05 GMT+0200 (Central European Summer Time)
// hola mundo Fri Apr 24 2020 12:03:06 GMT+0200 (Central European Summer Time)
// hola mundo Fri Apr 24 2020 12:03:07 GMT+0200 (Central European Summer Time)
// hola mundo Fri Apr 24 2020 12:03:08 GMT+0200 (Central European Summer Time)
// hola mundo Fri Apr 24 2020 12:03:09 GMT+0200 (Central European Summer Time)

///

setInterval(() => {
    console.log('hola mundo', new Date)
    
    // loong synchronous processing
    const before = Date.now()
    while(Date.now() - before < 2000);
}, 1000)

// hola mundo Fri Apr 24 2020 12:03:38 GMT+0200 (Central European Summer Time)
// hola mundo Fri Apr 24 2020 12:03:40 GMT+0200 (Central European Summer Time)
// hola mundo Fri Apr 24 2020 12:03:42 GMT+0200 (Central European Summer Time)
// hola mundo Fri Apr 24 2020 12:03:44 GMT+0200 (Central European Summer Time)
// hola mundo Fri Apr 24 2020 12:03:46 GMT+0200 (Central European Summer Time)