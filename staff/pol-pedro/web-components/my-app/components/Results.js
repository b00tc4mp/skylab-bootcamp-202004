function Results(name, surname, email) {
    const temp = document.createElement('li')

    temp.innerHTML = `<li>User name: ${name}, User surname; ${surname}, User email: ${email}</li>`

    const container = temp.firstChild

    return container
}