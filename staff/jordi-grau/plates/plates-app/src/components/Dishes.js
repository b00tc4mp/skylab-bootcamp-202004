import React, {useState} from 'react'

export default function ({dishes}) {
    return <section>
        <ul>
            {dishes.map(dish=> {
              return  <li>
                  <p>{dish.name}</p>
                  {dish.tags.map(tag=><p>{tag}</p>)}
                  </li>
            })}
        </ul>
    </section>
    
}