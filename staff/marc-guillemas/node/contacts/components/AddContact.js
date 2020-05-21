// TODO web
module.exports = () => {
    return `<section>
        <form action="/contacts" method="POST">
            <input type="text" name="name" placeholder="name"></input>
            <input type="text" name="surname" placeholder="surname"></input>
            <input type="text" name="email" placeholder=""></input>
            <input type="text" name="phone"></input>
            <input type="text" name="birthdate"></input>
            <button>Submit</button>
        </form>
    </section>`
}