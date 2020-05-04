
class News extends Component {
     componentDidMount () {
        news20 ((found) => { 
            this.props.onNews(found)
        }) 
    }

    render () {

        return <section class="news-grid">
            {this.props.results && this.props.results.map(({textTitle, link}) => <div><a href={`${link}`} target="blank"><h1>{textTitle}</h1></a></div>)}
        </section>
    }
}


// class News extends Component {
//     constructor() {
//         super()
//         this.state = {loading: ''}
//     }

//     creatList = () => {
//         news20(found => {
//             this.setState({news1 : found})
//         })
//         let results = this.state.news1
//         return results.map(({textTitle, link}) => <div><a href={`${link}`} target="blank"><h1>{textTitle}</h1></a></div>)
//     }

//     render () {
//         return <section class="news-grid">{this.creatList()}</section>
//     }



// }



// class News extends Component {
//     constructor () {
//         super(`<section class="news-grid">
//         <div></div>
//         <div></div>
//         <div></div>
//         <div></div>
//         <div></div>
//         <div></div>
//         </section>`)
//         const section = this.container.querySelectorAll('div')
//         news20(function(results){
//             for (var i = 0; i < 6; i++){
//                 const temp = document.createElement('div')
//                 temp.innerHTML = `<a href="${results[i].link}" target="_blank"><h1>${results[i].textTitle}</h1></a>`
//                 const names = temp.firstChild
//                 section[i].append(names)
//             }
//         })
//         document.getElementById('root').appendChild(this.container)
//     }
// }