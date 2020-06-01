
function ListContacts(contacts, feedback) {
    return `<section class="contacts">
    <a href='/home'>Home</a>
    <h2>Contacts list</h2>
    <div class='table'>
        <div class='table__header'>
            <div>Name</div>
            <div>Surname</div>
            <div>E-mail</div>
            <div>Phone</div>
            <div>Birthdate</div>
            <div>Country</div>
            <div>Remove</div>
        </div>
        <div class='table__body'>
            ${contacts.length ? contacts.map(({ name, surname , email, phone,birthdate,country, contactId , userId}) => `
            <div class='table__item'>
            <p>${(name?name: ' ')}</p>
            <p>${(surname?surname: ' ')}</p>
            <p>${(email?email: ' ')}</p>
            <p>${(phone?phone: ' ')}</p>
            <p>${(birthdate?birthdate: ' ')}</p>
            <p>${(country?country: ' ')}</p>
            <div>
                <form method="POST" action="/contacts">
                    <input name='contactId' style='visibility:hidden;' value=${contactId}>
                    <button>Remove</button>
                </form>
            </div>
            </div>
           `).join('') 
           :
           `${feedback?'':'No contacts added'}`
           

            }
        </div>
</div>
    ${feedback ?feedback:''}
</section>`
}

module.exports = ListContacts