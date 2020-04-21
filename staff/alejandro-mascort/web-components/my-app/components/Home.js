// TODO show "Welcome, <name>!"

function Home(name, toLanding) {
    const temp = document.createElement('div')

    temp.innerHTML = `<section class="home">
    <h1>Welcome, ${name}!</h1><button>Logout</button>
    
    <section class="search">
        <form>
            <input type="text" name="query">
            <button>🔍</button>
        </form>
    </section>
</section>`
    const container = temp.firstChild

    const button = container.querySelector('button')

    const formSearch = container.querySelector('.search form')

    let result

    button.addEventListener('click', function(){
        toLanding()
    })

    formSearch.addEventListener('submit', function(event){
        event.preventDefault()

        if (result) container.removeChild(result)
        
        result = Results(formSearch.query.value)
        formSearch.query.value = ''

        container.append(result)
    })

    return container
}