const addContact = require('../logic/add-contact')

module.exports = ()  => {

    return `<section class="add-contact">
    <form action="/add-contact" method="POST">
        <input name="name" placeholder="name">
        <input name="surname" placeholder="surname">
        <input name="email" placeholder="email">
        <input name="phone" placeholder="phone">
        <input name="birthdate" placeholder="birthdate">
        <input name="country" placeholder="country">
        <button>Save</button>
    </form>
</section>`
}