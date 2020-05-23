module.exports = username => `<section class="home">
<h1>Welcome, ${username}!</h1>
<a class="home__link" href="/add-contact">Add contact</a>
<a class="home__link" href="add-sticky">Sticky</a>
<a class="home__link" href="/contacts">Contacts</a>
<form action="/logout" method="POST">
    <button>Logout</button>
</form>
</section>`