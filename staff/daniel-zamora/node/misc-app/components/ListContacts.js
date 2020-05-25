module.exports = (contacts)=>`<section class="contacts">
    <h2>Contact list</h2>
    <a class="home__link" href="/add-contact">Add contact</a>
<ul>
    ${contacts?contacts.map((contact) => `<li>
    <p>${contact.name}</p>
    <form method = "POST" id = "details">
    <input type="hidden" name = "contact" value = ${`${JSON.stringify(contact)}`}/>
    <button name = "details" formaction = "/contact-details">Details</button>
    <button name = "delete" formaction = "/contact-delete">Delete</button>
    </fom>       
</li>`).join(''):''}
</ul>
</section>`

// module.exports = (contacts)=>`<section class="contacts">
//     <h2>Contact list</h2>
//     <a class="home__link" href="/add-contact">Add contact</a>
// <ul>
//     ${contacts.map((contact) => `<li>
//     <p>${contact.name}</p>
//     <form action="/contact-details" method = "POST" id = "details">
//     <input type="hidden" name = "contact" value = ${`${JSON.stringify(contact)}`}/>
//     <button formaction = "/contact-details">Details</button>
//     </fom>
//     <form action="/contact-delete" method = "POST" id = "delete">
//     <input type="hidden" name = "id" value = ${contact.id}/>
//     <button formaction = "/contact-delete">Delete contact</button>    
//     </fom>
// </li>`).join('')}
// </ul>
// </section>`

/* <button type="submit" formaction="/action_one">First action</button>
<button type="submit" formaction="/action_two">Second action</button>

<input type="submit" name="action" value="Update" />
<input type="submit" name="action" value="Delete" />

if ($_POST['action'] == 'Update') {
    //action for update here
} else if ($_POST['action'] == 'Delete') {
    //action for delete
} else {
    //invalid action!
}  */