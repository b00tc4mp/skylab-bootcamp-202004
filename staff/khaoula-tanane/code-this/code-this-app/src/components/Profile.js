import React from 'react'
import  './Profile.sass'

export default function() {
    return <div class="layout">
    <div class="profile">
        <div class="profile__picture"><img src="https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" alt="ananddavis" /></div>
        <div class="profile__header">
            <div class="profile__account">
                <h4 class="profile__username">Kaulaa</h4>
            </div>
            <div class="profile__edit"><a class="profile__button" href="#">Edit Profile</a></div>
        </div>
        <div class="profile__stats">
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