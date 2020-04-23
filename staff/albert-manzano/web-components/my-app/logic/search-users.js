function searchUsers(query) {
    debugger
    query=query.toLowerCase()
    
    const _users = users.filter(function(user){
        
        const {name, surname,email}= user

        return name.toLowerCase().includes(query)||surname.toLowerCase().includes(query)||email.toLowerCase().includes(query)
    })
    //sanitaze
    //???? mirar debugger
    _users = _users.map(function(user){
        const {name,surname,email}=user
        return {name,surname,email}
    })

return _users
}

// const result = Result(user)
// const resultList = document.getElementById('resultslist')
// if(resultList !== null) resultList.remove()        
// if(result !== null)  container.appendChild(result)

