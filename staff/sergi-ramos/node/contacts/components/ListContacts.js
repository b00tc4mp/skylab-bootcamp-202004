const listContacts = require('../logic/list-contacts')
function ListContacts(contacts) {
    return `<section class="contacts">
    <h2>Contacts list</h2>
<ul>
    ${contacts.map(({ name }) => `<li>${name}</li>`).join('')}
</ul>
</section>`
}

module.exports = ListContacts