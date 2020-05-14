function NavBar({ homeClick, favClick, porfolioClick }) {

    return <nav className="nav-bar">
        <a href="#" className="nav-bar__item" onClick={homeClick}><i className="fa fa-home"></i><label >home</label></a>
        <a href="#" className="nav-bar__item" onClick={favClick}><i className="fa fa-heart"></i><label >favorites</label></a>
        <a href="#" className="nav-bar__item" onClick={porfolioClick}><i className="fa fa-bitcoin"></i><label >portfolio</label></a>
    </nav>
}