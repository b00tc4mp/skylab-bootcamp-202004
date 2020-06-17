import React from 'react'
import './Challenge.sass'
function Challenge({description, solution, difficulty, tests }) {

    // return <div className="item">
    //         <p className="item_info">{description}</p>
    //         <p className="item_info">{difficulty}</p>
    //         <p className="item_info">{tests}</p>
    //     </div>
      
   return <div className="container">
   <div className="section-wrapper">
     <div className="section">
       <h4>{description}</h4>
       <p>{difficulty}</p>
       <p>{tests}</p>
       <div>
       </div>
     </div>

   </div>
 </div>


} 
export default Challenge