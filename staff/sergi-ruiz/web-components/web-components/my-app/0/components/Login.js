function Login(users) {
    const temp = document.createElement('div')

    temp.innerHTML = `<section class="Hello ${users.name}">
    <h1>Login</h1>
    <form>
        <input type="email" name="email" placeholder="e-mail">
        <input type="password" name="password" placeholder="password">
        <button>Submit</button>
    </form>
</section>`

    const container = temp.firstChild

    return container;
}