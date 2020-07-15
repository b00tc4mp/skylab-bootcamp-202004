// const removeSticky = require('../logic/remove-sticky')


// module.exports= stickies => {

//     const handleStickyRemove = (userId, idSticky)=>{
    
//         removeSticky(userId,idSticky, (error, feedback)=> {
//             if (error) throw error
//             if (feedback) return
//             else throw new Error('something went wrong')
//         })
//     }

//     return `<section class="stickies__list">
//     <h2>Stickies list</h2>
// <ul>
//     ${stickies.map(({ message, idSticky, userId })  => `<li><form action="/list-stickies" method="GET">${message}<button onclick="${handleStickyRemove}">trapping</button></form></li>`).join('')}
// </ul>
// </section>`
// }

module.exports = stickies =>{
return `<section class="stickies__list">
    <h2>Stickies list</h2>
<ul>
    ${stickies.map(({ message, idSticky})  => `<li><form action="/list-stickies/${idSticky}" method="GET">${message}<button>remove</button></form></li>`).join('')}
</ul>
</section>`
}