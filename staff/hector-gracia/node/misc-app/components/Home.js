function Home(userName){
    return `<section class="home">
<h1>Welcome, ${userName}!</h1>
<a class="home__link" href="">Manage stickies</a>
<a class="home__link" href="/add-contact">Manage contacts</a>
<form action="/logout" method="POST">
    <button>Logout</button>
</form>
</section>`
}
module.exports=Home;