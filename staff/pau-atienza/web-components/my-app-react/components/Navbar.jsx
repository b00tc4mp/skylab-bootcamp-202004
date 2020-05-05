function NavBar({setHomeView, name}){



    return <section className = 'home'> 
        <header>
            <h1>Welcome to the best website in the net, {name}</h1>
            <button>Log out</button>
            <nav>
            <a href = '' onClick = {(event)=>{
                event.preventDefault()
                setHomeView('user')
            }}>User Search </a>
            <a href = '' onClick = {(event)=>{
                event.preventDefault()
                setHomeView('google')
            }}>Google Search </a>
            <a href = '' onClick = {(event)=>{
                event.preventDefault()
                setHomeView('twitter')
            }}>Twitter</a>
            </nav>    
        </header>
    </section>
}