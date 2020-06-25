import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import './Footer.sass'
import homeIcon from '../images/black-home.png'
import myFamilyIcon from '../images/white-family.png'
import heartIcon from '../images/heart.png'
import settingsIcon from '../images/white-settings.png'
import homeIconColor from '../images/white-home.png'
import familyIconColor from '../images/black-family.png'
import heartIconColor from '../images/heart-white.png'
import colorSettings from '../images/settings-black.png'

function Footer({history}) {
    useEffect(()=>{

    },[history])
    
    return (
        <section className='footerContainer'>
            <div className="footerContainer__home">
                {history.location.pathname === '/home' && <Link to="/home"><img alt='home icon' className='footerContainer__home--homeIcon' src={homeIcon}></img></Link>}
                {history.location.pathname !== '/home' && <Link to="/home"><img alt='home icon' className='footerContainer__home--homeIcon' src={homeIconColor}></img></Link>}
            </div>
            <div className="footerContainer__myFamily">
                {history.location.pathname !== '/my-family' && <Link to="/my-family"><img alt='mt family icon' className='footerContainer__home--homeIcon' src={myFamilyIcon}></img></Link>}
                {history.location.pathname === '/my-family'  && <Link to="/my-family"><img alt='mt family icon' className='footerContainer__home--homeIcon' src={familyIconColor}></img></Link>}
            </div>
            <div className="footerContainer__stats">
            {history.location.pathname === '/main-stats' && <Link to="/main-stats"><img alt='stats icon' className='footerContainer__home--homeIcon' src={heartIcon}></img></Link>}
            {history.location.pathname !== '/main-stats' && <Link to="/main-stats"><img alt='stats icon' className='footerContainer__home--homeIcon' src={heartIconColor}></img></Link>}
            </div>
            <div className="footerContainer__settings">
            {history.location.pathname !== '/settings' && <Link to="/settings"><img alt='setttings icon' className='footerContainer__home--homeIcon' src={settingsIcon}></img></Link>}
            {history.location.pathname === '/settings' && <Link to="/settings"><img alt='settings icon' className='footerContainer__home--homeIcon' src={colorSettings}></img></Link>}
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