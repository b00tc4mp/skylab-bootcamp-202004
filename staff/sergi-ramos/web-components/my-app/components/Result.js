class Result extends Components {
    constructor(users) {

        let updateUser = ''
        if (users.length) {
            users.forEach(function (user) { updateUser += `\n<li>${user.name} ${user.surname} : ${user.email}</li>` })

            super(`<section class="results">
                        <ul>
                     ${updateUser}
                        </ul>
                    </section>`)
        } else {
            updateUser += '<p class="feedback--warning">No results obtained</p>'
            super(`<section class="results">
                     ${updateUser}
                    </section>`)
        } 
    }
}