function Navbar({onClick,onLogout,name}){
    return <>
     <section className='navbar'>
            <nav className='navbar'>
                <h3 className='navbar__title'>Welcome {name}</h3>
                <a className = 'navbar__ancor' href="" onClick={(event)=>{
                    event.preventDefault();
                    onClick('users')
                }}> Users </a>
                <a  className = 'navbar__ancor' href="" onClick={(event)=>{
                    event.preventDefault();
                    onClick('google')
                }}> Google </a>
                <a  className = 'navbar__ancor' href="" onClick={(event)=>{
                    event.preventDefault();
                    onClick('news')
                }}> News </a>
                <a  className = 'navbar__ancor' href="" onClick={(event)=>{
                    event.preventDefault();
                   onClick('twitter')
                }}> Twitter</a>
                <button className="navbar__button" onClick={(event)=>{
                    event.preventDefault();
                    onLogout()}} >LogOut</button>
            </nav>
        </section>
    </>
}