class Results extends Component{
    constructor(_users) {
        super(`<section class="results">
</section>`)

    if (_users.length) {
        const list = document.createElement('ul')

        _users.forEach(({ name, surname, email }) => {
            const item = document.createElement('li')

            item.innerText = `${name} ${surname} ${email}`

            list.appendChild(item)
        })

        this.container.appendChild(list)
    } else this.container.appendChild(new Feedback('sorry, no results :(', 'warning').container)

}
}