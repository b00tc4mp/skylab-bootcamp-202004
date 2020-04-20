// TODO show "Welcome, <name>!"

function Home(callback) {
    const temp = document.createElement('div')

    temp.innerHTML = ` <section class="home">
    <div id="fullname">
    <h1>Bienvenido!</h1>
        <p  title="name" ></p> <p title="surname"></p>
    </div>
</section>`

    const container = temp.firstChild

    const form = container.querySelector('form')

    form.addEventListener('submit', function (event) {
        event.preventDefault()

        const name = event.target.name.value,
            surname = event.target.surname.value

        callback(name, surname)
    })

    return container
}


