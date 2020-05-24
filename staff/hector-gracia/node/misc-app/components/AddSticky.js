function AddSticky(){
    return `<section class="add-sticky">
    <form action="/add-sticky" method="POST">
        <label for="title">Title</label>
        <input name="title" placeholder="title"}>
        <label for="description">Description</label>
        <input name="description" placeholder="description"}>
        
        <button>Add</button>
    </form>
</section>`
}
module.exports=AddSticky;