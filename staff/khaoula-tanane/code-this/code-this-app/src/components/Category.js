import React from 'react'
import './Category.sass'
import { Link, withRouter } from 'react-router-dom'

function Category({ name, match }) {

    // return <div className="item">
    //         <p className="item_info">{description}</p>
    //         <p className="item_info">{difficulty}</p>
    //         <p className="item_info">{tests}</p>
    //     </div>
      
   return <div class="container">
   <div class="section-wrapper">
     <div class="section">
     <Link to={`${match.path}/${name}`}>{name}</Link>
       <div>
       </div>
     </div>

   </div>
 </div>


} 
export default withRouter(Category)