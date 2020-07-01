import React, { useEffect, useState } from "react";
import './Home.sass'
import { frases } from '../constants/palabras-niños'
import retrieveUser from "termometro-client-logic/retrieve-user";

function Home() {

  const [user, setUser] = useState();

  useEffect(() => {
    try {
      retrieveUser(sessionStorage.token)
        .then(user => setUser(user))
    } catch (error) {
      if (error) throw error
    }
  }, [])

  let randomSentence = frases[Math.floor(frases.length * Math.random())];

  return (
    <section className='homeContainer'>
      {user && !user.mood && <h1 className='homeContainer__title'>Bienvenido al termometro de la autoestima, {user.name} </h1>}
      {user && user.mood[user.mood.length-1].score <5 && <h1 className='homeContainer__title'>Hoy será un buen día, {user.name} </h1>}
      <p className='homeContainer__text'>{randomSentence.sentence}<br /><br />{randomSentence.author}</p>
    </section>
  );
}

export default Home;
