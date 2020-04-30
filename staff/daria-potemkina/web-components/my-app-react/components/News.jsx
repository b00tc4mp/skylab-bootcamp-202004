// class News extends Component {
//   constructor(results) {
//     super(`<section class="news">
//       </section>`)

//     for (let i = 0; i < results.length; i++) {
//       const _image = document.createElement('img')
//       const _section = document.createElement('h5')
//       const _title = document.createElement('a')
//       const _content = document.createElement('p')

//       _image.src = `${results[i].image}`
//       _section.innerHTML = `${results[i].section}`
//       _title.href = `${results[i].link}`
//       _title.target = '_blank'
//       _title.innerHTML = `${results[i].title}`
//       _content.innerHTML = `${results[i].content}`

//       this.container.appendChild(_image)
//       this.container.appendChild(_section)
//       this.container.appendChild(_title)
//       this.container.appendChild(_content)
//     }
//   }
// }

class News extends Component {
  constructor() {
    super()

    this.state = { news: undefined }

  }

  componentDidMount() {
    dailyNews((news) => {
      this.setState({ news })
    })
  }

  render() {
    return <section className="news">
      <h2>The New York Times</h2>
      {this.state.news && <ul>
        {
          this.state.news.map(({ title, content, link, image }) =>
            <li>
              <img src={image} />
              {/* <h3>{section}</h3> */}
              <a href={link} target='_blank'>{title}</a>
              <p>{content}</p>
            </li>)}
      </ul>
      }
    </section>
  }
}