function Home(callback) {
  const temp = document.createElement("div");

  temp.innerHTML = `<section>
    <h2 id ='home'>Welcome {name}</h2>
</section>`;

  const container = temp.firstChild;

  const home = container.querySelector(form);

   

  callback(name, surename, email);

  return container;
}
