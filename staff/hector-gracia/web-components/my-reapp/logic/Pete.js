class Pete{
    constructor(message,user){
        if(typeof message!=="string") throw new TypeError(message+" is not a string");
        if(user.constructor.name!=="User") throw new TypeError(user +" is not a User");
        this.message=message;
        this.user=user;
        this.date=Date.now();
        //Cuanto likes tiene y quien se lo ha dado
        this.likes=0;//Hay que quitar esto y que saque cuantos likes tiene en base al contador
        this.likedFrom=[]
    }
    liked(user){
        //Error if user no es un User
        if(user===undefined) throw new Error("user is not defined");
        if(user.constructor.name!=="User") throw new TypeError(user +" is not a User");
        this.likes++;
        this.likedFrom.push(user);
    }
}