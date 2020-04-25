function fillUsers(newUsers){
    let name,surname,email,password;
    for(var i=0; i<newUsers;i++){
        name=names.random();
        surname=surnames.random();
        registerUser(name,surname,`${name.toLowerCase().split(' ').join('')}${surname.toLowerCase().split(' ').join('')}${i}@mail.com`,"123123123");
    }
}
function fillPetes(newPetes){
    for(var i=0;i<newPetes;i++){
        sendPete(users.random().name,presetPetes.random());
    }
}