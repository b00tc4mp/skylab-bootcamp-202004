module.exports = () =>{
    return `<section class="add-contact">
    <form action="/add-contact" method="POST">
        <input type="text" name="name" placeholder="John">
        <input type="text" name="surname" placeholder="Doe">
        <input type="email" name="email" placeholder="johndoe@mail.com">
        <input type="tel" name="phone" placeholder="+34 123-45-67-89">
        <input type="date" name="birthdate">
        <input type="text" name="country", placeholder="Spain">
        <button>Add</button>
</form>
</section>`
}