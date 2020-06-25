import React from 'react'
import './RestaurantItem.sass'


export default function RestaurantItem({data:{_id, name, address}, onToDetails}){
     
    return <div  className="restaurantitem">
        <a href="#"  className="restaurantitem__data" onClick={(event)=>{
            event.preventDefault()
        
            onToDetails(_id)}}>{name}</a>
        <span>{address}</span>
    </div>
    
}