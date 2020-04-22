// TODO show "Welcome, <name>!"

function Search() {
    const temp = document.createElement('div')

    temp.innerHTML = `<section class="search">
        <form>
            <input type="text" name="query">
            <button>🔍</button>
        </form>
    </section>`

    const container = temp.firstChild

    const formSearch = container.querySelector('form')

    let result, query

    formSearch.addEventListener('submit', function(event){
        event.preventDefault()

        if (result) container.removeChild(result)

        result = undefined
        query = formSearch.query.value
        
        if (query.trim().length > 0 && typeof query != 'undefined') {
            result = Results(query)

            container.append(result)
        }
    })

    return container
}