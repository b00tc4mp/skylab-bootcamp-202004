function NavBar({callback, name}){
    return <section className = 'home'> 
    <header>
        <h1>Welcome to the best website in the net, {name}</h1>
        <button>Log out</button>
        <nav>
           <a href = '' onClick = {(event)=>{
               event.preventDefault()
               callback('user')
           }}>User Search</a>
           <a href = '' onClick = {(event)=>{
               event.preventDefault()
               callback('google')
           }}>Google Search</a>
           <a href = '' onClick = {(event)=>{
               event.preventDefault()
               callback('ecosia')
           }}>Ecosia Search</a>
           <a href = '' onClick = {(event)=>{
               event.preventDefault()
               callback('twitter')
           }}>Twitter</a>
        </nav>    
    </header>
</section>
}