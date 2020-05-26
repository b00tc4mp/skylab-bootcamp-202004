module.exports = name => `<section class="home">
<h1>Welcome, ${name}!</h1>
<a class="home__link" href="">Users</a>
<a class="home__link" href="">Google</a>
<a class="home__link" href="">Hola News</a>
<form action="/logout" method="POST">
    <button>Logout</button>
</form>
</section>`