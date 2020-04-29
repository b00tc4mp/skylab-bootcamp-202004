const { Component } = React

class HolaNews extends Component {
    componentDidMount() {
        this.props.onMount()
    }

    render() {
        return <section class="hola-news">
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