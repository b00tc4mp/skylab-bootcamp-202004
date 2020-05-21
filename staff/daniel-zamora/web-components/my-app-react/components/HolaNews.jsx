class HolaNews extends Component {
    componentDidMount() {
        !this.props.news && retrieveHolaNews((error, news) => {
            if (error) throw error // TODO handle this error!

            this.props.onNews(news)
        })
    }

    render() {
        return <section className="hola-news">
            <h2>Hola News</h2>

            {this.props.news && <ul>
                    {this.props.news.map(({ image, link, text }) => 
                        <li>
                            <a href={link} target="_blank">
                                <img src={image} />
                                <p>{text}</p>
                            </a>
                        </li>
                    )}
                </ul>}
        </section>
    }
}