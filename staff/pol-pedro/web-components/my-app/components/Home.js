
function Home(name, surname, callback) { debugger
    const temp = document.createElement('div')

    temp.innerHTML = `<section class="home">
    <h1>Welcome, ${name} ${surname} </h1><button>Logout</button>
    </section>`

    const container = temp.firstChild
    const button = container.querySelector('button') // querry selector all

    button.addEventListener('click', function() {
        callback()
    })

    return container
}