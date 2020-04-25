class EcosiaResult extends Component {
  constructor(appends) {
    super(`<section class="ecosiaResults">
        
        </section>`);

    if (appends.length) {
    const list = document.createElement('section');

    appends.forEach(function ({ title, content, link }) {
      const item = document.createElement('h2');
      const itemP = document.createElement('p');
      const itemLink = document.createElement('p');

      item.innerText = `${title}`;
      itemP.innerText = `${content}`;
      itemLink.innerHTML = `<a href="${link}">${link}<a></a>`;

      list.appendChild(item);
      list.appendChild(itemP);
      list.appendChild(itemLink);
    
    });
    
    this.container.appendChild(list)

}else this.container.appendChild(new Feddback('sorry, no results'))
}
}