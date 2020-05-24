function ListContacts(contacts) {
    return `<section class="contacts">
        <h1>Contacts List</h1>
        <ul>
            ${contacts.map(({ name, id }) => `<li>${name} <form action="/delete-contact" method='GET'>
            <button>Delete</button>
            </form></li>`).join('')}
            
        </ul>
    </section>`
}

module.exports = ListContacts