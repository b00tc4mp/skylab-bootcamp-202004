function searchUser(input){
    if (typeof input !== 'string') throw new TypeError(input + ' is not a string');
    
    // no email searches for security reasons (@, .com, gmail, etc.)
    const tempUser = users.filter(({name, surname}) => name.toLowerCase().includes(input.toLowerCase()) || surname.toLowerCase().includes(input.toLowerCase()));
    //Sanitising
    const results = tempUser.map(({name, surname, email}) => ({name, surname, email}))

    return results
}