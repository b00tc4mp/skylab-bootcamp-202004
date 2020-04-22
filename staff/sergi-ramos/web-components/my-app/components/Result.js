function Result(users) {
    debugger
    const temp = document.createElement('div')

    let updateUser = ''
    if (users.length) {
        users.forEach(function (user) { updateUser += `\n<li>${user.name} ${user.surname} : ${user.email}</li>` })

        temp.innerHTML = `<section class="results">
                        <ul>
                     ${updateUser}
                        </ul>
                    </section>`
    } else {
        updateUser += '<p class="feedback--warning">No results obtained</p>'
        temp.innerHTML = `<section class="results">
                     ${updateUser}
                    </section>`
    }
    const container = temp.firstChild

    return container
}