import React from 'react'
import { Link, withRouter } from 'react-router-dom'

function Category({ name, match, isAdmin, _id, handeDeleteCategory, challenges }) {
    
   return (
    <>
    {!isAdmin && <Link className="category-link" to={`${match.path}/${name}`}>{name}</Link>}
    

    {isAdmin && (
      <div className="card"  onClick={() => handeDeleteCategory(_id)} data-label="DELETE">
        <div className="card__container">
          <h4>{name}</h4>
          <h5>{challenges.length} challenges</h5>
        </div>
      </div>
    )}
      </>
   )



} 
export default withRouter(Category)