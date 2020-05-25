module.exports = username => `<section class="home">
<h1>Welcome, ${username}!</h1>
<a class="home__link" href="/contacts">Contacts</a>
<a class="home__link" href="/stickies">Stickies</a>
<a class="home__link" href="/users">Users</a>
<form action="/logout" method="POST">
    <button>Logout</button>
</form>
</section>`