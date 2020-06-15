import React from 'react'
import { Link } from 'react-router-dom'

export default function() {

    return <section className="about">
        <h1>About the Symptomiser</h1>
        <p>Description of the Symtomiser, who participated, other projects from the same group...</p>
        <div className="about__links">
            <Link className="about__links--item" to="http://b2slab.upc.edu/">B2S Research Group</Link>
            <Link className="about__links--item" to="https://www.share4rare.org/">Share4Rare</Link>
            <Link className="about__links--item" to="">Pau Atienza</Link>
            <Link className="about__links--item" to="https://hpo.jax.org/app/">HPO</Link>
        </div>
  </section>
}




