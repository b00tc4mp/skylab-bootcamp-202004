const {useState} = React

function Navbar({onChangeView }){
    
    const [view, setView] = useState('home')
    
    // <a className={`home__link ${this.state.view === 'users' ? 'home__link--active' : ''}`} href="" onClick={this.handleUsers}>Users </a>

    return <nav className="navbar">
        <ul className="navbar__list">
            <li className={`navbar__item ${view === 'home'} ? 'navbar__item--active' : ''`}>
                <a href="" onClick={event => {
                    event.preventDefault()

                    setView('home')
                    onChangeView('home')
                }}><i className="fas fa-home"></i></a>
            </li>
            <li className={`navbar__item ${view === 'browser'} ? 'navbar__item--active' : ''`}>
                <a href="" onClick = {event => {
                    event.preventDefault()

                    setView('browser')
                    onChangeView('browser')
                }}><i className="fas fa-music"></i></a>
            </li>
            <li className={`navbar__item ${view === 'favorites'} ? 'navbar__item--active' : ''`}>
                <a href="" onClick = {event => {
                    event.preventDefault()

                    setView('favorites')
                    onChangeView('favorites')
                }}><i className="far fa-heart"></i></a>
            </li>
            <li className={`navbar__item ${view === 'friends'} ? 'navbar__item--active' : ''`}>
                <a href="" onClick = {event => {
                    event.preventDefault()

                    setView('friends')
                    onChangeView('friends')
                }}><i className="fas fa-users"></i></a>
            </li>
            <li className={`navbar__item ${view === 'login'} ? 'navbar__item--active' : ''`}>
                <a href="" onClick = {event => {
                    event.preventDefault()

                    setView('login')
                    onChangeView('login')
                }}><i className="fas fa-sign-out-alt"></i></a>
            </li>
        </ul>
    </nav>
        
     
   
}

{/* <nav class="navbar">
<ul class="navbar__list">
    <li class="navbar__item">
        <a href=""><i class="fas fa-home"></i></a>
     </li>
    <li class="navbar__item">
        <a href=""><i class="fas fa-music"></i></a>
     </li>
    <li class="navbar__item">
        <a href=""><i class="far fa-heart"></i></a>
     </li>
    <li class="navbar__item">
        <a href=""><i class="fas fa-users"></i></a>
     </li>
    <li class="navbar__item">
        <a href=""><i class="fas fa-sign-out-alt"></i></a>
    </li>
</ul>

</nav> */}