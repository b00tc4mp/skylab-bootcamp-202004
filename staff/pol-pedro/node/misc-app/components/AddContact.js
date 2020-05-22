module.exports = () => {
    return `<section class="search-contacts">
    <form action="/add-contact" method="POST">
        <label for="name">Name</label>
        <input name="name" placeholder="name"}>
        <label for="surname">Surname</label>
        <input name="surname" placeholder="surname"}>
        <label for="email">Email</label>
        <input name="email" placeholder="email"}>
        <label for="phone">Phone</label>
        <input name="phone" placeholder="phone"}>
        <button>Add</button>
    </form>
</section>`
}