class News extends Component {
  constructor(results) {
    super(`<section class="news">
      </section>`)

    for (let i = 0; i < results.length; i++) {
      const _image = document.createElement('img')
      const _section = document.createElement('h5')
      const _title = document.createElement('h1')
      const _content = document.createElement('p')
      const _link = document.createElement('a')

      _image.src = `${results[i].image}`
      _section.innerHTML = `${results[i].section}`
      _title.innerHTML = `${results[i].title}`
      _content.innerHTML = `${results[i].content}`
      _link.innerHTML = `${results[i].link}`
      _link.href = `${results[i].link}`

      this.container.appendChild(_image)
      this.container.appendChild(_section)
      this.container.appendChild(_title)
      this.container.appendChild(_content)
      this.container.appendChild(_link)
    }
  }
}