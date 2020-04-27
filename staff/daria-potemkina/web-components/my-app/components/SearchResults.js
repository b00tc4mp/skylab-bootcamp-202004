class SearchResults extends Component {
  constructor(matchingList) {
    super(`<section class="result">
      </section>`)

    let feedback
    if (matchingList.length) {
      for (let i = 0; i < matchingList.length; i++) {
        const _title = document.createElement('a')
        const _content = document.createElement('p')

        _title.innerHTML = `${matchingList[i].title}`
        _title.href = `${matchingList[i].link}`
        _title.target = '_blank'
        _content.innerHTML = `${matchingList[i].content}`

        this.container.appendChild(_title)
        this.container.appendChild(_content)
        
      }
    } else {
      feedback = new Feedback('La búsqueda no obtuvo ningún resultado.', 'warning')
      this.container.appendChild(feedback.container);
    }
  }
}