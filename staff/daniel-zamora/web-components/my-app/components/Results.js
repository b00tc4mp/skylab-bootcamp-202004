class Results extends Component {
    constructor (users) {
    super(`<search class="results">
    </search>`)

    if(.length) {
        const list = document.createElement ('ul')

        users.array.forEach(({name, surname, email}) => {
            const item = document.createElement('li')

            item.innerText = `${name} ${surname} ${email}`

            list.appendChild(item)
        });
    
    this.container.appendChild(list)
    } else this.container.appendChild(new Feedback ('sorry, any result was found').container)
}
}