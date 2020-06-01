module.exports = feedback => {
    return `<section class = "add-contact">
    <a href='/home'>Home</a>

    <h2>Add contact</h2>
        <form action="/add-contact" method="POST">
            <input type="text" name="name" placeholder='Name'>
            <input type="text" name="surname" placeholder='Surname'>
            <input type="email" name="email" placeholder='E-mail'>
            <input type="text" name="phone" placeholder='Phone'>
            <input type="text" name="birthdate" placeholder="dd/mm/yyyy">
            <input type="text" name="country" placeholder="country">
            <button>Add</button>
        </form>

        ${feedback ? feedback:''}
    
    </section>
    `
}
