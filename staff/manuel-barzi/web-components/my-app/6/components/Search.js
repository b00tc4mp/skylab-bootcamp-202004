function Search(onSubmit) {
    Component.call(this, `<section class="search">
    <form>
        <input type="text" name="query">
        <button>🔍</button>
    </form>
</section>`)

    const form = this.container.querySelector('form')

    form.addEventListener('submit', function (event) {
        event.preventDefault()

        const query = event.target.query.value

        onSubmit(query)
    })
}

Search.prototype = Object.create(Component.prototype)
Search.prototype.constructor = Search