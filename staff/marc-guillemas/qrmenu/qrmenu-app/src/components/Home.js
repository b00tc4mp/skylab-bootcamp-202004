import React, {useState} from 'react'
import Navbar from './Navbar'
import './Navbar.sass' 
import Header from './Header'
import './Header.sass' 
import Orders from './Orders'
import Tables from './Tables'
import QrCodes from './QrCodes'
import Admin from './Admin'

export default function({onLogout}) {

    const [view, setView] = useState()
    const [burguerActive, setBurguerActive] = useState()


    const handleChangeView = _view => {
        setView(_view)
    }

    return <section className="home">
        <Navbar onChangeView={handleChangeView}  onLogout={onLogout}  active={burguerActive}/><Header onBurguerActive={setBurguerActive}/>
        {view === '/orders' && <Orders/>}
        {view === '/tables' && <Tables/>}
        {view === '/qrcodes' && <QrCodes/>}
        {view === '/admin' && <Admin/>}
    </section>
}