import React from 'react'


export default function RestaurantItem({data:{_id, name, address}, onToDetails}){
     
    return <div className="restaurantItem">
        <button className="restaurant_item" onClick={()=>onToDetails(_id)}>{name}</button>
        <span>{address}</span>
    </div>

}