module.exports = name => `<section class="home">
${name  ? `<h1>Welcome,  ${name} ! </h1>`: ``}
<a class="home__link" href="/add-contacts">Add contact</a>
<a class="home__link" href="/list-contacts">List contacts</a>
<a class="home__link" href="/search-contacts">Search contacts</a>
<a class="home__link" href="/add-sticky">Add sticky</a>
<a class="home__link" href="/list-stickies">List stickies</a>
<a class="home__link" href="/search-stickies">Search stickies</a>
<form action="/logout" method="POST">
    <button>Logout</button>
</form>
</section>`