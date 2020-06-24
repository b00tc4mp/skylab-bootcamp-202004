import React, { useEffect, useState } from 'react'
// import  './Profile.sass'
import { retrieveUser } from 'code-this-client-logic'

function Profile() {
    const [user, setUser] = useState(null)
    useEffect(() => {
        handleRetrieveUser()
    }, [])
    
    const handleRetrieveUser = async ()=> {
        const _user = await retrieveUser()
        setUser(_user)
    }

    console.log(user)
    return <div class="layout">
    <div class="profile">
        <div class="profile__picture">
            <img src={`https://api.adorable.io/avatars/${user?.name}@adorable.png`} alt={user?.name} />
        </div>
        <div class="profile__header">
            <div class="profile__account">
                <h4 class="profile__username">{user?.name}</h4>
            </div>
            <div class="profile__edit"><a class="profile__button" href="#">Edit Profile</a></div>
        </div>
        <div class="profile__stats">
        <div class="profile__stat">
            <div class="profile__icon profile__icon--blue"><i class="fas fa-signal"></i></div>
            <div class="profile__value">2
                <div class="profile__key">Votes</div>
            </div>
            </div>
            <div class="profile__stat">
                <div class="profile__icon profile__icon--blue"><i class="fas fa-signal"></i></div>
                <div class="profile__value">2
                    <div class="profile__key">Challenges</div>
                </div>
            </div>
            <div class="profile__stat">
                <div class="profile__icon profile__icon--pink"><i class="fas fa-heart"></i></div>
                <div class="profile__value">15
                    <div class="profile__key">Score</div>
                </div>
            </div>
        </div>
    </div>
</div>
}
export default Profile