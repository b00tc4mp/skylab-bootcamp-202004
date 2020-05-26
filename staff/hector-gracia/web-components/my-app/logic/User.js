class User{
    constructor(name,surname,email,password){
        if(typeof name!=="string") throw new TypeError(name+ " is not a string");
        if(typeof surname!=="string") throw new TypeError(surname+ " is not a string");
        if(typeof email!=="string") throw new TypeError(email+ " is not a string");
        if(typeof password!=="string") throw new TypeError(password+ " is not a string");
        //info del usuario
        this.name=name;
        this.surname=surname;
        this.email=email;
        this.password=password;
        //array de seguidores y a quien sigue
        this.followers=[];
        this.following=[];
        //array con los petes de ese usuario
        this.petes=[];
        //Array con los petes a los que le ha dado a like
        this.liked=[]
    }
    //Hacer que el usuario siga a otro
    follow(targetUser){
        //Comprueba que el targetUser sea un User
        if(targetUser.constructor.name!=="User") throw new TypeError(targetUser +" is not a User");
        if(!this.following.includes(targetUser)){
            this.following.push(targetUser);
            targetUser.followers.push(this);
        }else{
            this.unfollow(targetUser);
        }
    }
    //Hacer unfollow a usuarios
    unfollow(targetUser){
        if(targetUser===undefined) throw new Error("target is not defined");
        if(targetUser.constructor.name!=="User") throw new TypeError(targetUser +" is not a User");
        if(!targetUser.followers.includes(this)) throw new Error ("user was not already following the target");
        this.following.splice(this.following.indexOf(targetUser),1);
        targetUser.followers.splice(targetUser.followers.indexOf(this),1);


    }
    //Hacer que el usuario escriba petes
    makePete(message){
        this.petes.push(new Pete(message,this));
    }
    //Hacer que el usuario pueda darle like al pete
    likePete(targetPete){
        //Error if target no es un pete
        if(targetPete===undefined) throw new Error ("target is not defined");
        if(targetPete.constructor.name!=="Pete") throw new TypeError(targetPete +" is not a Pete");
        if(!this.liked.includes(targetPete)){
            this.liked.push(targetPete);
            targetPete.liked(this);
        }
        
        //TODO dislike pete

    }

}