// function commentCards(idCurrentUser, token, callback) {
//     debugger

//     call("GET", "https://skylabcoders.herokuapp.com/api/v2/users/all", undefined,
//         { Authorization: `Bearer ${token}` }, (error, status, body) => {

//             if (error) return callback(error);

//             if (status === 200) {

//                 let redCards = 0
//                 let yellowCards = 0
//                 let greenCards = 0

//                 const users = JSON.parse(body)
//                 let usersHaveCards = users.filter((user) => {
//                     return user.red || user.green || user.yellow

//                 })

//                 //for red card
//                 usersHaveCards.forEach(user => {
//                     for (redIds of user.red) {
//                         if (redIds === idCurrentUser) {
//                             redCards++
//                         }
//                     }
//                 })
//                 //for yellow card
//                 usersHaveCards.forEach(user => {
//                     for (yellowIds of user.yellow) {
//                         if (yellowIds === idCurrentUser) {
//                             yellowCards++
//                         }
//                     }
//                 })
//                 //for green card
//                 usersHaveCards.forEach(user => {
//                     for (greenIds of user.green) {
//                         if (greenIds === idCurrentUser) {
//                             greenCards++
//                         }
//                     }
//                 })
//                 callback(undefined, redCards, yellowCards, greenCards)

//             } else {
//                 const { error } = JSON.parse(body)
//                 callback(new Error(error));
//             }
//         })
// }


