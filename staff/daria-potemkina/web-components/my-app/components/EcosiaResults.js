class EcosiaResults extends Component {
  constructor(matchingList) {
    super(`<section class="result">
      </section>`)

    let feedback
    if (matchingList.length) {
      for (let i = 0; i < matchingList.length; i++) {
        const _title = document.createElement('h1')
        const _content = document.createElement('p')
        const _link = document.createElement('a')

        _title.innerHTML = `${matchingList[i].title}`
        _content.innerHTML = `${matchingList[i].content}`
        _link.innerHTML = `${matchingList[i].link}`
        _link.href = `${matchingList[i].link}`

        this.container.appendChild(_title)
        this.container.appendChild(_content)
        this.container.appendChild(_link)
        
      }
    } else {
      feedback = new Feedback('La búsqueda no obtuvo ningún resultado.', 'warning')
      this.container.appendChild(feedback.container);
    }
  }
}