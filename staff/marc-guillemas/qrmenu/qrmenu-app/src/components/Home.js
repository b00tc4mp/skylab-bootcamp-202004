import React, {useState, useEffect} from 'react'
import Navbar from './Navbar'
import './Navbar.sass' 
import Header from './Header'
import './Header.sass' 
import Orders from './Orders'
import Tables from './Tables'
import QrCodes from './QrCodes'
import Admin from './Admin'
import { Route, withRouter, Redirect } from 'react-router-dom'


export default function({onLogout, history}) {

    const [burgerActive, setBurgerActive] = useState()

    // useEffect(() => {
    //     setBurguerActive(false)
    // },[])

    const handleChangeRoute = _route => {
        history.push(_route)
    }

    // const handleToggleBurger = () => {
    //     setBurguerActive(false)
    // }

    return <section className="home">
        <Navbar onChangeRoute={handleChangeRoute}  onLogout={onLogout}  active={burgerActive} onBurgerActive={setBurgerActive}/>
        <Header onBurgerActive={setBurgerActive} active={burgerActive}/>
        {/* {history.location.pathname === '/orders' && <Orders/>} */}
 
        <Route path="/orders" render={() => <Orders /> } />
        <Route path="/tables" render={() => <Tables /> } />
        <Route path="/qrcodes" render={() => <QrCodes /> } />
        <Route path="/admin" render={() => <Admin /> } />
    </section>
}