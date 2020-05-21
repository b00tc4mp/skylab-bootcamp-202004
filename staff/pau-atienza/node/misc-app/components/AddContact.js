module.exports = () => {
    return `<section class = "add-contact">
    <h2>Add contact</h2>
<form action="/add-contact" method="POST">
    Name: <input type="text" name="name">
    Surname: <input type="text" name="surname">
    E-mail: <input type="email" name="email">
    Phone: <input type="text" name="phone">
    <button>Add</button>
</form>
</section>
    `
}