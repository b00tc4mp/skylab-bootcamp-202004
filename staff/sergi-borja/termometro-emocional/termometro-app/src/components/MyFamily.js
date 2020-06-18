import React, { useState, useEffect } from 'react'
import './MyFamily.sass'
import { Link } from 'react-router-dom'
import { createMemberList } from 'termometro-client-logic'

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
            <Link to='/create-member' className='familyContainer__addButton'></Link>
            <h1 className='familyContainer__title'>My Family</h1>
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