function Result(user) { debugger

    const temp = document.createElement('div')
    let updateUser = ''
    for (let i = 0; i < user.length; i ++){
    updateUser += `<li>${user[i].name} ${user[i].surname} : ${user[i].email}</li>`
    }

    temp.innerHTML = `<search class="results" id='result-list'>
    <ul>
        ${updateUser}
    </ul>
</search>`


    const container = temp.firstChild


    return container
}