module.exports = () => {
    return `<section class = "add-contact">
    <h2>Add contact</h2>
<form action="/add-contact" method="POST">
    <label for = "name">Name:</label> <input id="name" type="text" name="name"> <br>
    <label for = "surname">Surname:</label><input id="surname "type="text" name="surname"> <br>
    <label for = "email">E-mail:</label><input type="email" id="email" name="email"> <br>
    <label for = "phone">Phone:</label><input type="text" id="phone" name="phone"> 
    <button>Add</button>
    <a href = '/home'>Home</a>
</form>
</section>
    `
}