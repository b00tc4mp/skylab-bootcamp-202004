function Home(name, callback) {
    const temp = document.createElement('div')

    temp.innerHTML = `<section class="home">
    <h1>Welcome, ${name}!</h1><button>Logout</button>
</section>`

    const 

    const button = container.querySelector('button')
    
    button.addEventListener('click', function() {
        callback()
    })

    let results

    container.appenChild(search(function (query) {
        const users = searchUsers(query)

        if (!results) {
            results = Results (users)

            container.appendChild(results)
        }
        else {
            const _results = results

            results = Results(users)

            _results.ReplaceWith(results)
        }
    }))
       
    return container
}