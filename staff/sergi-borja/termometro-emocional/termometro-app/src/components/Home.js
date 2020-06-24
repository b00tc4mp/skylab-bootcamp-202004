import React from "react";
import './Home.sass'
import { frases } from '../constants/palabras-niños'

function Home({ userName }) {

  let randomSentence = frases[Math.floor(frases.length * Math.random())];

  return (
    <section className='homeContainer'>
      <h1 className='homeContainer__title'>Bienvenido al termometro de la autoestima, {userName} </h1>
      <p className='homeContainer__text'>{randomSentence}</p>
    </section>
  );
}

export default Home;
