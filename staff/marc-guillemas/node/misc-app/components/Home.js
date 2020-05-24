module.exports = name => `<section class="home">
${name  ? `<h1>Welcome,  ${name} ! </h1>`: ``}
<a class="home__link" href="/add-contacts">Add Contact</a>
<a class="home__link" href="/list-contacts">List Contacts</a>
<a class="home__link" href="/search-contacts">Search Contacts</a>
<form action="/logout" method="POST">
    <button>Logout</button>
 
</form>
</section>`