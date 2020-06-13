import React, { useState, useEffect } from 'react'
import './MyFamily.sass'
import { Link } from 'react-router-dom'
import { createMemberList } from 'termometro-client-logic'

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
            <h1>My Family</h1>
            <Link to='/create-member' className='familyContainer__addButton'></Link>
            <ul className='familyContainer__ul'>
                {memberList && memberList.map((member)=><li className='familyContainer__li'>{member.name} <button className='familyContainer__editMemberButton' onClick={()=> handleGoToEdit(member) }></button></li>)}
            </ul>
        </section>
    );
}

export default MyFamily;