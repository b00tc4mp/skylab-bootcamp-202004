import React from "react";
import { Link } from "react-router-dom";
import './Footer.sass'
import homeIcon from '../images/home.png'
import myFamilyIcon from '../images/familia.png'
import heartIcon from '../images/heart.png'
import settingsIcon from '../images/ajustes.png'

function Footer() {
    return (
        <section className='footerContainer'>
            <div className="footerContainer__home">
                <Link  to="/home"><img className='footerContainer__home--homeIcon' src={homeIcon}></img></Link>
            </div>
            <div className="footerContainer__myFamily">
                <Link  to="/my-family"><img className='footerContainer__home--homeIcon' src={myFamilyIcon}></img></Link>
            </div>
            <div className="footerContainer__stats">
                <Link  to="/main-stats"><img className='footerContainer__home--homeIcon' src={heartIcon}></img></Link>
            </div>
            <div className="footerContainer__settings">
                <Link  to="/settings"><img className='footerContainer__home--homeIcon' src={settingsIcon}></img></Link>
            </div>
        </section>
    );
}
export default Footer;

// function Footer ({GoToSearch, GoToHome, GoToFavs, footerState, sportState}) {

//     const handleGoToSearch= () => {
//         GoToSearch()
//     }
//     const handleGoToHome = () => {
//         GoToHome()
//     }

//     const handleGoToFavs = () => { //put state to change color to white on the section your at and not at hover at least for movile
//         GoToFavs()
//     }

//     return <footer className="Footer">
//     <section className="Footer__container">
//         <i onClick={handleGoToHome} className={"fas fa-home fa-2x fa-home" + (sportState === 'surf' ? 'Surf' : 'Snow') + (footerState === 'home' ? '--active' : '') }></i>
//         <i onClick={handleGoToSearch} className={`fas fa-search fa-2x fa-search` + (sportState === 'surf' ? 'Surf' : 'Snow') + (footerState === 'search' ? '--active' : '') }></i>
//         <i className={`fas fa-map-marked-alt fa-2x fa-map-marked-alt` + (sportState === 'surf' ? 'Surf' : 'Snow') + (footerState === 'map' ? '--active' : '') }></i>
//         <i onClick={handleGoToFavs} className={`fas fa-star fa-2x fa-star` + (sportState === 'surf' ? 'Surf' : 'Snow') + (footerState === 'favs' ? '--active' : '') }></i>
//     </section>
// </footer>

// }