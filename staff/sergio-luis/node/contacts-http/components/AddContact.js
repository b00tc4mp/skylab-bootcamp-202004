module.exports = () => {
    return `<section class = "add-contact">
    <h2>Add contact</h2>
<form action="/add-contact" method="POST">
            <input type="text" name="name">
            <input type="text" name="surname">
            <input type="email" name="email">
            <input type="text" name="phone">
            <button>Add</button>
</form>
</section>
    `
}

