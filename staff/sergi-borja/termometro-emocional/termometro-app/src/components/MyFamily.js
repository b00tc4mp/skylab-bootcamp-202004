import React, { useState, useEffect } from 'react'
import './MyFamily.sass'
import { Link } from 'react-router-dom'
import { createMemberList } from 'termometro-client-logic'
import addLogo from '../images/cool-add.png'

// import editImg from '../images/editar.png'


function MyFamily({ token, handleGoToEdit }) {

    const [memberList, setMemberList] = useState()

    useEffect(() => {
        try {
            (async () => {
                const familyList = await createMemberList(token);
                await setMemberList(familyList);
            })()

        } catch (error) {
            if (error) throw error;
        }
    }, [])


    return (
        <section className='familyContainer'>
            <div className='familyContainer__container'>
        <img className='familyContainer__image' src={addLogo}></img>
        <Link to='/create-member' className='familyContainer__addButton'></Link>
            <h1 className='familyContainer__title'>Mi Familia</h1>
            </div>
            <div className='familyContainer__familyListContainer'>
                <ul className='familyContainer__familyListContainer--ul'>
                    {memberList && memberList.map((member) => <li onClick={() => handleGoToEdit(member)} className='familyContainer__familyListContainer--li'>{member.name} </li>)}
                </ul>
            </div>
            
        </section>
    );
}

export default MyFamily;