module.exports = () =>{
    return `<section class="add-sticky">
    <h1>Add your sticky</h1>
        <form action="/add-sticky" method="POST">
            <textarea name='stiky' placeholder="Write your note here..."></textarea>
            <button>Add</button>
        </form>
</section>`
}