module.exports = () => {
    return `<section class="unregister">
    <h1>Unregister</h1>
    <form action="/unregister" method="POST">
        <input type="email" name="email" placeholder="e-mail">
        <input type="password" name="password" placeholder="password">
        <button>Submit</button>
    </form>
</section>`
}