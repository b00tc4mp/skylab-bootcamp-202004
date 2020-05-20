class News extends Component {

    componentWillMount() {
        !this.props.news && retrieveNews((error, news) => {
            if (error) {
                throw error;
            }
            this.props.onNews(news);
        })

    }

    render() {
        return <section className='news'>
            <h2>news</h2>

            {this.props.news && <ul>
                {this.props.news.map(({ image, content, link }) =>
                    <li>
                        <a href={link} target="_blank">
                            <img src={image} />
                            <p>{content}</p>
                            <hr/>
                        </a>
                    </li>
                )}
            </ul>}   
        </section>
    }
}    