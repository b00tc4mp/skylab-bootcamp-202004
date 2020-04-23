class Results extends Component {
    constructor(users) {

        super(`<section class="results">
        </section>`)

        if (users.length) {
            const list = document.createElement('ul')

            // users.forEach(function (user) {
            users.forEach(function ({name,surname,email}) {
                const item = document.createElement('li')

                item.innerText = `${name} ${surname} (${email})`

                list.appendChild(item)
            })

            this.container.appendChild(list)
        } else this.container.appendChild(new Feedback('sorry, no results :(', 'warning')
        .container)
    }
}
    // let updateUser = ''


    // for(var i = 0; i < users.length; i++){
    //   updateUser += `<li>${user[i].name} ${user[i].surname} : ${user[i].email}</li>`
    // }
    //   temp.innerHTML = `<search class="results">
    //                         <ul> 
    //                         ${updateUser} 
    //                         </ul>
    //                     </search>`

    //   const container = temp.firstChild

    //   return container;