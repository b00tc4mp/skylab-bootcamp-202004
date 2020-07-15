// const listContacts = require('../logic/list-contacts') a la espera de ver si hace falta para algo
function ListContacts(contacts) {
    return `<section class="contacts">
    <h2>Contacts list</h2>
    <form action="/add-contact" method="GET">
        <button>Add  more</button>
    </form>
    <form action="/home" method="GET">
        <button>Back to home</button>
    </form>
<ul>
    ${contacts.map(({ name="",surname="", email="",phone="" }) => `<li>${name} ${surname} ${email} ${phone}</li>`).join('')}
</ul>
</section>`
}

module.exports = ListContacts