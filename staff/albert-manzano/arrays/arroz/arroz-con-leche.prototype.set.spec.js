'use strict'

// .describe('set', function () {
//     it('if j is not arroz will throw error', function () {
//         var a = new ArrozConLeche( new Arroz(1, 2, 3), new Arroz('a', 'b', 'c', 'd'), new Arroz(true, true, false, false, false))
//         a.set(10,undefined,"techno")

//         expect(a[11]).toBe("techno");
//     });

//     it('returns undefined if the length of the array is 0', function () {
//         var array = new Arroz();

//         var result = array.find(function (element) {
//             return element < 4;
//         });

//         expect(result).toBe(undefined);
//     });

//     it('should return undefined if objects are compared in the condition', function () {
//         var array = new Arroz('spray', [1, 2], 'elite', 'exuberant', 'destruction', 'present');

//         var result = array.find(function (element, i, array) {
//             return element === [1, 2]
//         })

//         expect(result).toBe(undefined);
//     });

//     it('return array in each iteration', function () {
//         var array = new Arroz(1, 2, 3, 3, 4);


//         var result = array.find(function (element, i, array) {
//             return element === array[i + 1];
//         });


//         expect(result).toBe(3);
//     });

    
// });