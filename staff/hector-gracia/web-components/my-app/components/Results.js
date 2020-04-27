//Lista con los resultados de la busqueda de usuarios, de petes y de noticias
class Results extends Component{
    constructor(logedUser){
        super(`<section class="results">
        </section>`)
        this.search;
        this.logedUser=logedUser;
    }
    //Cambia el contenido segun la llamada
    changeContent(style,user){
        switch(style){
            case "profile":
                const profileList=document.createElement("ul");
                profileList.className=("pete__list");
                for(let i=0;i<user.petes.length;i++){
                    const item=document.createElement("li");
                    item.className="pete__message";
                    item.innerText=`${user.name} ${user.surname}: \n ${user.petes[i].message}`;
                    item.addEventListener("click",(event)=>{
                        this.logedUser.likePete(user.petes[i]);
                    })
                    profileList.appendChild(item);
                }
                if(!this.search){
                    this.search=profileList;
                    this.container.appendChild(profileList);
                }else{
                    this.container.removeChild(this.search);
                    this.search=profileList;
                    this.container.appendChild(profileList);
                }
                break;
            case "feed":
                const feedList=document.createElement("ul");
                feedList.className=("pete__list");
                for(let i=0;i<user.following.length;i++){
                    for(let j=0;j<user.following[i].petes.length;j++){
                        const item=document.createElement("li");
                        item.className="pete__message";
                        item.innerText=`${user.following[i].name} ${user.following[i].surname}:\n ${user.following[i].petes[j].message}`;
                        item.addEventListener("click",(event)=>{
                            user.likePete(user.following[i].petes[j]);
                        })
                        feedList.appendChild(item);
                    }
                }
                if(!this.search){
                    this.search=feedList;
                    this.container.appendChild(feedList);
                }else{
                    this.container.removeChild(this.search);
                    this.search=feedList;
                    this.container.appendChild(feedList);
                }
                break;
            case "following":
                const followingList=document.createElement("ul");
                followingList.className=("pete__list");
                for(let i=0;i<user.following.length;i++){
                    const item=document.createElement("li");
                    item.innerText=`${user.following[i].name} ${user.following[i].surname}`;
                    item.className="pete__message";
                    item.addEventListener("click",(event)=>{
                        event.preventDefault();
                        this.changeContent("profile",user.following[i]);
                    });
                    followingList.appendChild(item);
                }
                if(!this.search){
                    this.search=followingList;
                    this.container.appendChild(followingList);
                }else{
                    this.container.removeChild(this.search);
                    this.search=followingList;
                    this.container.appendChild(followingList);
                }
                break;
            case "followers":
                const followersList=document.createElement("ul");
                followersList.className=("pete__list");
                for(let i=0;i<user.followers.length;i++){
                    const item=document.createElement("li");
                    item.innerText=`${user.followers[i].name} ${user.followers[i].surname}`;
                    item.className="pete__message";
                    item.addEventListener("click",(event)=>{
                        event.preventDefault();
                        this.changeContent("profile",user.followers[i]);
                    });
                    followersList.appendChild(item);
                }
                if(!this.search){
                    this.search=followersList;
                    this.container.appendChild(followersList);
                }else{
                    this.container.removeChild(this.search);
                    this.search=followersList;
                    this.container.appendChild(followersList);
                }
                break;
            case "likes":
                const likesList=document.createElement("ul");
                likesList.className=("pete__list");
                for(let i=0;i<user.liked.length;i++){
                    const item=document.createElement("li");
                    item.className="pete__message";
                    item.innerText=`${user.liked[i].user.name} ${user.liked[i].user.surname}: \n ${user.liked[i].message}`;
                    item.addEventListener("click",(event)=>{
                        user.likePete(user.liked[i]);
                    })
                    likesList.appendChild(item);
                }
                if(!this.search){
                    this.search=likesList;
                    this.container.appendChild(likesList);
                }else{
                    this.container.removeChild(this.search);
                    this.search=likesList;
                    this.container.appendChild(likesList);
                }
                break;
            case "discover":
                const discoverList=document.createElement("ul");
                discoverList.className="pete__list";
                for(let i=0;i<users.length;i++){
                    const item=document.createElement("li");
                    item.className="pete__message";
                    item.innerText=`${users[i].name} ${users[i].surname}`;
                    item.addEventListener("click",(event)=>{
                        this.logedUser.follow(users[i]);
                    })
                    discoverList.appendChild(item);
                }
                if(!this.search){
                    this.search=discoverList;
                    this.container.appendChild(discoverList);
                }else{
                    this.container.removeChild(this.search);
                    this.search=discoverList;
                    this.container.appendChild(discoverList);
                }
                break;
            case "news":
                dnavarra((error,data)=>{
                    const newsList=document.createElement("ul");
                    newsList.className="pete__list";
                    for(let i=0;i<data.length;i++){
                        const item=document.createElement("li");
                        item.className="pete__message";
                        const title= document.createElement("h2");
                        title.innerText=data[i][0];
                        const body=document.createElement("p");
                        body.innerText=data[i][2]===undefined?" ":data[i][2];
                        item.appendChild(title);
                        item.appendChild(body);
                        item.addEventListener("click",(event)=>{
                            window.open(data[i][1]);
                        })
                        newsList.appendChild(item);
                    }
                    if(!this.search){
                        this.search=newsList;
                        this.container.appendChild(newsList);
                    }else{
                        this.container.removeChild(this.search);
                        this.search=newsList;
                        this.container.appendChild(newsList);
                    }
                })
                break;
        }
    }
    
}