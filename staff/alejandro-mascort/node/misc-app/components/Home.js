module.exports = name => {

    return`<section class="home">
    <h1>Welcome, ${name}!</h1>
    <a class="home__link home__link--active" href="">Users</a>
    <a class="home__link" href="">Google</a>
    <form method="POST" action="/logout">
        <button>Logout</button>
    </form>
    `
}