module.exports = () =>{
    return `<section class="add-sticky">
    <form action="/add-sticky" method="POST">
        <input type="text" name="name" placeholder="John">
        <input type="text" name="surname" placeholder="Doe">
        <input type="text" name="sticky" placeholder="write your message">
        <button>Add</button>
</form>
</section>`
}