function fillUsers(newUsers){//Genera un determinado numero de usuarios al azar
    let name,surname,email,password;
    for(var i=0; i<newUsers;i++){
        name=names.random();
        surname=surnames.random();
        registerUser(name,surname,`${name.toLowerCase().split(' ').join('')}${surname.toLowerCase().split(' ').join('')}${i}@mail.com`,"123123123");
    }
}
function fillPetes(newPetes){//Genera un determinado numero de petes al azar
    for(var i=0;i<newPetes;i++){
        users.random().makePete(presetPetes.random());
    }
}
function fillFollows(newfollows){//Hace que los usuarios se sigan entre ellos
    for(var i=0; i<newfollows;i++){
        users.random().follow(users.random());
    }
}
function fillLikes(likePercentage){//Hace que los usuarios den likes a los petes
    let rand=0;
    for(var i=0;i<users.length;i++){
        for(var j=0;j<users[i].following.length;j++){
            for(var k=0;k<users[i].following[j].petes.length;k++){
                rand= Math.random()*100;
                if(rand<likePercentage){
                    users[i].likePete(users[i].following[j].petes[k]);
                }
            }
        }
    }
}
function fillSocializing(newUsers,newPetes,newfollows,likePercentage){//Todas las anteriores a la vez
    fillUsers(newUsers);
    fillFollows(newfollows);
    fillPetes(newPetes);
    fillLikes(likePercentage);

}