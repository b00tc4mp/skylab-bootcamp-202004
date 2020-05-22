function ListContacts(contacts) {
    return `<section class="contacts">
        <h1>Contacts List</h1>
        <ul>
            ${contacts.map(({ name }) => `<li>${name}</li>`).join('')}
        </ul>
    </section>`
}

module.exports = ListContacts