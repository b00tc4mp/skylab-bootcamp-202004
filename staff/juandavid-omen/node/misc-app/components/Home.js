module.exports = name => `<section class="home">
<h1>Hello ${name}, Welcome!</h1>
<a class="w3-bar-item w3-button tablink w3-red" href="">Users</a>
<a class="w3-bar-item w3-button tablink" href="">Google</a>
<a class="w3-bar-item w3-button tablink" href="">Ecosia</a>
<a class="w3-bar-item w3-button tablink" href="">News</a>
<form action="/logout" method=""POST">
    <button id="logout">Logout</button>
</form>
</section>`
