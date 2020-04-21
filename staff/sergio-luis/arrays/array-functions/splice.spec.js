// describe("splice", function () {
//     it("should cut two items of the array and return the rest modifying the array", function () {
//       var fruits = [
//         "Banana",
//         "Orange",
//         "Apple",
//         "Mango",
//         "Strawberry",
//         "Berry",
//         "Lemon",
//       ];
  
//       splice(fruits, 2, 2);
  
//       expect(fruits[3]).toBe("Berry");
//       expect(fruits.length).toBe(5);
//     });
//     it("should cut two items, add new item to that position and return the rest modifying the array", function () {
//       var fruits = [
//         "Banana",
//         "Orange",
//         "Apple",
//         "Mango",
//         "Strawberry",
//         "Berry",
//         "Lemon",
//       ];
  
//       splice(fruits, 2, 2, "Avocado", "Peach");
  
//       expect(fruits[3]).toBe("Avocado");
//       expect(fruits[4]).toBe("Peach");
//       expect(fruits.length).toBe(7);
//     });
//   });