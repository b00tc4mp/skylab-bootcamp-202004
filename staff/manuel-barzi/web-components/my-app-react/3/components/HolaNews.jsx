const { Component } = React

class HolaNews extends Component {
    constructor() {
        super()

        this.state = { news: undefined }
    }

    componentDidMount() {
        retrieveHolaNews((error, news) => {
            if (error) throw error // TODO handle this error!
    
            this.setState({ news })
        })
    }

    render() {
        return <section class="hola-news">
            <h2>Hola News</h2>

            {this.state.news && <ul>
                    {this.state.news.map(({ image, link, text }) => 
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