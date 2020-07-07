import React, { useState, useEffect } from 'react'
import './MyFamily.sass'
import { createFamilyList } from 'termometro-client-logic'
import { unRegisterUser } from 'termometro-client-logic'
import deleteIcon from '../images/delete-icon.png'
import './HandleAccounts.sass'
import backButton from '../images/back-icon.png'


function HandleAccounts({ token, history }) {

    const [familyList, setFamilyList] = useState()
    const [userDeleted, setUserDeleted] = useState()


    useEffect(() => {
        try {
            (async () => {
                const familyList = await createFamilyList(token);
                await setFamilyList(familyList);
            })()

        } catch (error) {
            if (error) throw error;
        }
    }, [userDeleted])

    const handleDeleteAccount = (userId) => {
        try {
            unRegisterUser(userId, token)
                .then(() => {
                    delete sessionStorage.token
                    window.location.reload()
                })
                .catch(error => console.error(error.message))
        } catch (error){
            if(error) throw error
        }
    }

    const handleDeleteMember = (member) => {
        try {
            unRegisterUser(member.id)
                .then(()=> setUserDeleted(member.id))
                .catch(error => console.error(error.message))
        } catch (error){
            if(error) throw error
        }
    }


    return (
        <section className='handleAccountsContainer'>
            <div className='handleAccountsContainer__container'>
            <img className='handleAccountsContainer__backIcon' src={backButton} onClick={()=>history.push('/settings')}></img>
            <h1 className='handleAccountsContainer__title'>Gestionar</h1>
            </div>
            {familyList &&  familyList.length > 0 && <div className='handleAccountsContainer__myUserTitle'>
            <h1 className='handleAccountsContainer__title'>Mi Familia</h1>
            </div>}
            <div className='handleAccountsContainer__familyListContainer'>
                <ul className='handleAccountsContainer__familyListContainer--ul'>
                    {familyList && familyList.map((member) => <li key={member.id} className='handleAccountsContainer__familyListContainer--li'>{member.name} <img onClick={()=>handleDeleteMember(member)} className='handleAccountsContainer__deleteIcon' src={deleteIcon}></img></li>)}
                </ul>
            </div>
            <div className='handleAccountsContainer__myUserTitle'>
            <h1 className='handleAccountsContainer__title'>Mi Cuenta</h1>
            </div>
            <div className='handleAccountsContainer__myUserContainer'>
            <h1 className='handleAccountsContainer__myUser' onClick={handleDeleteAccount}>Eliminar mi cuenta</h1>
            </div>
        </section>
    );
}

export default HandleAccounts;