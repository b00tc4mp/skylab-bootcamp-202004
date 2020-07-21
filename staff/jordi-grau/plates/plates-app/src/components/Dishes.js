import React, {useState} from 'react'
import './Dishes.sass'

export default function ({dishes}) {
    return <section className="dishes">
        <ul>
            {dishes && dishes.map(dish=> {
              return  <li>
                  <p>{dish.name}</p>
                  </li>
            })}
        </ul>
    </section>
    
}
{/* {dish.tags.map(tag=><p>{tag}</p>)} */}