import React, { useState, useEffect } from 'react'
import './MyFamily.sass'
import { Link } from 'react-router-dom'
import { createMemberList } from 'termometro-client-logic'
import { unRegisterUser } from 'termometro-client-logic'
import deleteIcon from '../images/delete-icon.png'
import './HandleAccounts.sass'
// import isAuthenticated from 'termometro-client-logic/is-authenticated'
// import editImg from '../images/editar.png'


function HandleAccounts({ token }) {

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

    const handleDeleteAccount = (userId) => {
        try {
            unRegisterUser(userId, token)
                .then(() => {
                    delete sessionStorage.token
                    window.location.reload()
                })
                .catch(error => console.log(error.message))
        } catch (error){
            if(error) throw error
        }
    }

    const handleDeleteMember = (member) => {
        try {
            unRegisterUser(member.id)
                .then(() => window.location.reload())
                .catch(error => console.log(error.message))
        } catch (error){
            if(error) throw error
        }
    }


    return (
        <section className='familyContainer'>
            <div className='familyContainer__container'>
            <h1 className='familyContainer__title'>Mi Familia</h1>
            </div>
            <div className='familyContainer__familyListContainer'>
                <ul className='familyContainer__familyListContainer--ul'>
                    {memberList && memberList.map((member) => <li className='familyContainer__familyListContainer--li'>{member.name} <img onClick={()=>handleDeleteMember(member)} className='familyContainer__deleteIcon' src={deleteIcon}></img></li>)}
                </ul>
            </div>
            <div className='familyContainer__container'>
            <h1 className='familyContainer__title'>Mi Cuenta</h1>
            </div>
            <h1 className='familyContainer__familyListContainer--li' onClick={handleDeleteAccount}>Eliminar mi cuenta <img className='familyContainer__deleteIcon' src={deleteIcon}></img></h1>
        </section>
    );
}

export default HandleAccounts;