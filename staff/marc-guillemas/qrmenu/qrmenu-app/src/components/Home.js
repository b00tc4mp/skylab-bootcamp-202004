import React, {useState, useEffect} from 'react'
import Navbar from './Navbar'
import './Navbar.sass' 
import Header from './Header'
import './Header.sass' 
import Orders from './Orders'
import Tables from './Tables'
import QrCodes from './QrCodes'
import Dishes from './Dishes'
import Admin from './Admin'
import { Route, withRouter, Redirect } from 'react-router-dom'
import isGuestUser from 'qrmenu-client-logic/is-guest-user'


export default function({onLogout, history, onScan }) {

    const [burgerActive, setBurgerActive] = useState(true)
    const [qrcode, setQrCode] = useState()
    
    useEffect(() => {
       if (!isGuestUser(history.location.pathname)) history.push('/login')
    },[])

    const handleChangeRoute = _route => {
        history.push(_route)
    }

    const handleToggleTable = _qrcode => {
        setQrCode(_qrcode)
        onScan(_qrcode)
        history.push('/qrcode')
    }

    return <section className="home">
      
        {sessionStorage.token &&
        <div>
            <Navbar onChangeRoute={handleChangeRoute}  onLogout={onLogout}  active={burgerActive} onBurgerActive={setBurgerActive}/>
            <Header onBurgerActive={setBurgerActive} active={burgerActive}/>
      
 
            <Route path="/orders" render={() => <Orders /> } />
            <Route path="/tables" render={() => <Tables onToggleTable={handleToggleTable}/> } />
            <Route path="/qrcode" render={() => <QrCodes qrcode={qrcode}/> } />
            <Route path="/admin" render={() => <Admin /> } />

        </div>
        }

      
        <Route path="/establishment/:establishmentId/table/:tableId" render={() => 
           <Dishes history={history}/>
          } />

    </section>
}