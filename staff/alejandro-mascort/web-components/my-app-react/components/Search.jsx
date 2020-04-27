// class Search extends Component {
//     constructor(onSubmit) {
//         super(`<section class="search">
//     <form>
//         <input type="text" name="query">
//         <button>🔍</button>
//     </form>
// </section>`)

//         const form = this.container.querySelector('form')

//         form.addEventListener('submit', function (event) {
//             event.preventDefault()

//             const query = event.target.query.value

//             onSubmit(query)
//         })
//     }
// }

function Search({onSubmit}) {
    return <section className='search'>
        <form onSubmit={ event => {
            event.preventDefault()

            query = event.target.query.value

            onSubmit(query)
        }}>
            <input type='text' name='query'></input>
            <button>🔍</button>
        </form>
    </section>
}
