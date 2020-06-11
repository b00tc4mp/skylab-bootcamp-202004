import React from "react";
import './Home.sass'

function Home(userAuthenticated) {

  return (
    <section className='homeContainer'>
      <h1 className='homeContainer__title'>Bienvenido al termometro del autoestima, {userAuthenticated.name} </h1>
  <p className='homeContainer__text'>Es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto.{'\n'}-Ander, 7 años</p>
    </section>
  );
}

export default Home;
