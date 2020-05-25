class Navigation extends Component{
    constructor(user,onProfile,onDiscover,onFeed,onFollowing,onFollowers,onLikes,onLogOut,onNews,onSubmit){
        super(`<section class="user__view">
        <section class="navigation">
                <h1 class="navigation__title">${user.name}</h1></br>
                
                <input class="peter__input" placeholder="What's in your mind?" required>
                <button class="peter__button">SHARE 🦗</button></br>
                
                <button class="navigation__button">MY PROFILE</button></br>
                <button class="navigation__button">DISCOVER</button></br>
                <button class="navigation__button">FEED</button></br>
                <button class="navigation__button">FOLLOWING</button></br>
                <button class="navigation__button">FOLLOWERS</button></br>
                <button class="navigation__button">LIKES</button></br>
                <button class="navigation__button">LOG OUT</button></br>
                <button class="navigation__button">NEWS</button></br>
            </section>
            <section class="results">
            <h1>A ver donde sale esto</h1>
            </section>
            </section>`);
        //Selecciona la ventana que muestra las busquedas
        const searchResults=new Results(user);
        const res=this.container.children[1];
        res.replaceWith(searchResults.container);
        
        //Coge los botones para darle funcionamiento
        const input=this.container.querySelector("input");
        const submit= this.container.querySelectorAll("button")[0];
        const profile= this.container.querySelectorAll("button")[1];
        const discover= this.container.querySelectorAll("button")[2];
        const feed= this.container.querySelectorAll("button")[3];
        const following= this.container.querySelectorAll("button")[4];
        const followers= this.container.querySelectorAll("button")[5];
        const likes= this.container.querySelectorAll("button")[6];
        const logOut= this.container.querySelectorAll("button")[7];
        const news= this.container.querySelectorAll("button")[8];
        profile.addEventListener("click",function(event){
            event.preventDefault();
            onProfile(searchResults);
        })
        discover.addEventListener("click",function(event){
            event.preventDefault();
            onDiscover(searchResults);
        })
        feed.addEventListener("click",function(event){
            event.preventDefault();
            onFeed(searchResults);
        })
        following.addEventListener("click",function(event){
            event.preventDefault();
            onFollowing(searchResults);
        })
        followers.addEventListener("click",function(event){
            event.preventDefault();
            onFollowers(searchResults);
        })
        likes.addEventListener("click",function(event){
            event.preventDefault();
            onLikes(searchResults);
        })
        logOut.addEventListener("click",function(event){
            event.preventDefault();
            onLogOut(searchResults);
        })
        news.addEventListener("click",function(event){
            event.preventDefault();
            onNews(searchResults);
        })
        submit.addEventListener("click",function(event){
            event.preventDefault();
            onSubmit(input,user);
        })
    }
}