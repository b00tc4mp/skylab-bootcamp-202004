import React, { useState, useEffect } from 'react'
import './MyFamily.sass'
import { Link } from 'react-router-dom'
import { createMemberList } from 'termometro-client-logic'

function MyFamily({ token }) {

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


    console.log(memberList)
    return (
        <section className='familyContainer'>
            <Link to='/create-member' className='familyContainer__addButton' >Añadir</Link>
            {memberList && <h1>{memberList}</h1>}
            {/* <ul>
                {memberList.map((member)=>{
                    <li>{member}</li>
                })}
            </ul> */}
        </section>
    );
}

export default MyFamily;