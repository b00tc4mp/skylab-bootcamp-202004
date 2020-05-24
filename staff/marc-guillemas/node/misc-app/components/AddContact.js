module.exports = () => {
    return `<section>
        <form action="/add-contacts" method="POST">
            <input type="text" name="name" placeholder="John"></input>
            <input type="text" name="surname" placeholder="Doe"></input>
            <input type="text" name="email" placeholder="john@doe.com"></input>
            <input type="text" name="phone" placeholder="655345234"></input>
            <input type="date" name="birthdate" placeholder="01/01/1999"></input>
            <input type="text" name="country" placeholder="US"></input>
            <button>Submit</button>
        </form>
    </section>`
}