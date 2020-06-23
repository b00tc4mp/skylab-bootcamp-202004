import React, { useEffect, useState } from 'react'
import { retrieveUser } from 'termometro-client-logic'

function EditMyInfo({ token }) {
    const [userInfo, setUserInfo] = useState()

    useEffect(() => {
        try {
            retrieveUser(token)
                .then(user => {
                    setUserInfo(user)
                })
        } catch (error) {
            if (error) throw error
        }
    }, [])

    return (
        <section>
            <h1>EDIT MY PERSONAL INFO</h1>
            <h2>{userInfo && userInfo.name}</h2>
            <h2>{userInfo && userInfo.surname}</h2>
            <h2>{userInfo && userInfo.age}</h2>
            <h2>{userInfo && userInfo.sex}</h2>
            <h2>{userInfo && userInfo.email}</h2>
        </section>
    )

}

export default EditMyInfo