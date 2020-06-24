import React, {useState} from 'react'

export default function ({dishes}) {
    return <section>
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