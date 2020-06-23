import React from 'react'

export default function ({restaurant:{name, phone, email, address, dishes}}){
    <div>
        <div className="restaurant_details">
            <span className="restaurant_name">{name}</span>
            <span className="restaurant_phone">{phone}</span>      
            <span className="restautant_email">{email}</span>
            <span className="restaurant_address">{address}</span>
        </div>

        <Dishes dishes={dishes}/>
    
        {/* <div className="menu">
            <span></span>
        </div> */}

        <button className="buttonHome" onClick={onGotoHome}>Home</button>
        <button className="buttonLogout" onClick={onLogout}>Logout</button>
    </div>
    
    
}