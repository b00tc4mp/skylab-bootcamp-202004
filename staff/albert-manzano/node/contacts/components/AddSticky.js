module.exports = () =>{
    return `<section class="add-sticky">
    <form action="/add-sticky" method="POST">
        <input type="text" name="name" placeholder="place your text here">
       
        <button>Add</button>
</form>
</section>`
}