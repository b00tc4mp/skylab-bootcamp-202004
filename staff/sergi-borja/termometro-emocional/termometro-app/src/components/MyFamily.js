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
            <Link to='/create-member' className='familyContainer__addButton'>Añadir</Link>
            <ul className='familyContainer__ul'>
                {memberList && memberList.map((member)=><li>{member.name} <button onClick={()=> handleGoToEdit(member) }></button></li>)}
                
            </ul>
        </section>
    );
}

export default MyFamily;