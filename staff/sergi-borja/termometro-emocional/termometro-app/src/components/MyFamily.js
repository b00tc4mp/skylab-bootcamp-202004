import React, { useState, useEffect } from 'react'
import './MyFamily.sass'
import { Link } from 'react-router-dom'
import { createFamilyList } from 'termometro-client-logic'
import addLogo from '../images/cool-add.png'
import arrowIcon from '../images/arrow.png'

// import editImg from '../images/editar.png'


function MyFamily({ token, handleGoToEdit, rol }) {

    const [familyList, setFamilyList] = useState()

    useEffect(() => {
        
        try {
            (async () => {
                const familyList = await createFamilyList(token);
                await setFamilyList(familyList);
            })()

        } catch (error) {
            if (error) throw error;
        }
    }, [])


    return (
        <section className='familyContainer'>
            {!rol && <div className='familyContainer__container'>
                <img className='familyContainer__image' src={addLogo}></img>
                 <Link to='/create-member' className='familyContainer__addButton'></Link>
                <h1 className='familyContainer__title'>Mi Familia</h1>
            </div>}
            {rol && <div className='familyContainer__container'>
                <h1 className='familyContainer__title'>Mi administrador</h1>
            </div>}
            {!rol && <div className='familyContainer__familyListContainer'>
                <ul className='familyContainer__familyListContainer--ul'>
                    {familyList && familyList.map((member) => <li onClick={() => handleGoToEdit(member)} className='familyContainer__familyListContainer--li'>{member.name} {member.surname} <img className='familyContainer__arrowIcon' src={arrowIcon}></img></li>)}
                </ul>
            </div>}
            {rol && <div className='familyContainer__familyListContainer'>
                <ul className='familyContainer__familyListContainer--ul'>
                    {familyList && <li className='familyContainer__familyListContainer--li'>{familyList.name} {familyList.surname} </li>}
                </ul>
            </div>}

        </section>
    );
}

export default MyFamily;