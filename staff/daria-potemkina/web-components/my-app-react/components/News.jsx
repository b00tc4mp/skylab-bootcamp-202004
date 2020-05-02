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
              <a href={link} target='_blank'>{title}</a>
              <p>{content}</p>
            </li>)}
      </ul>
      }
    </section>
  }
}