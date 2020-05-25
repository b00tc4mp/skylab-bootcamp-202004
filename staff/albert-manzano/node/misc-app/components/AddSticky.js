module.exports = () =>{
    return `<section class="add-sticky">
    <form action="/add-sticky" method="POST">
        <textarea name="message" placeholder="Place your message here"></textarea>
        <button type="submit">Add</button>
    </form>
</section>`
}