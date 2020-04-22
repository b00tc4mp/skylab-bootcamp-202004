function Search(onSubmit) {
    const temp = document.createElement('div')

    temp.innerHTML = `<section class="search">
    <form>
        <input type="text" name="query">
        <button>🔍</button>
    </form>
</section>`

    const container = temp.firstChild

    const form = container.querySelector('form')

    form.addEventListener('submit', function (event) {
        event.preventDefault()

        const query = event.target.query.value

        onSubmit(query)
    })

    return container
}