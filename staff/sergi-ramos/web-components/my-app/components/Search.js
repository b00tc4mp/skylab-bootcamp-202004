function Search() {

    const temp = document.createElement('div')

    temp.innerHTML = `<section class="search">
                        <form>
                            <input type="text" name="query">
                            <button>🔍</button>
                        </form>
                    </section>`


    const container = temp.firstChild
    const searchButton = container.querySelector('form')
    searchButton.addEventListener('submit', function (event) { debugger
                
        event.preventDefault()
        const query = event.target.query.value
        const user = searchUser(query)
        const result = Result(user)
        const resultList = document.getElementById('result-list')
        if(resultList !== null) resultList.remove()        
        if(result !== null)  container.appendChild(result)
    })

    return container
}