module.exports = name => `<section class="home">
    <h1>Welcome, ${name}!</h1>
    <a class="home__link" href="/add-contact">Add Contact</a>
    <a class="home__link" href="/search-contacts">Search Contacts</a>
    <a class="home__link" href="/sticky">Sticky</a>
    <form action="/logout" method="POST">
        <button type="submit">Logout</button>
    </form>
</section>`