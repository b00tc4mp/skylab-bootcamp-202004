import React from 'react'
import './MyFamily.sass'
import { Link } from 'react-router-dom'

function MyFamily() {

    return (
        <footer className='familyContainer'>
            <Link to='/create-member' className='familyContainer__addButton' >Añadir</Link>
            <div className='familyContainer__ul'>
                <h2>Marina Tarrés</h2>
            </div>
            <div className='familyContainer__ul'>
                <h2>Marina Tarrés</h2>
            </div>
        </footer>
    );
}

export default MyFamily;