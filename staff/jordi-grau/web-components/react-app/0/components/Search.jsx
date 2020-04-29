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

function Search({ onSubmit }) {
    function handleSubmit(event) { 
        event.preventDefault()

        let { query } = event.target 

        query = query.value

        onSubmit(query)
    }

    return <section className="search">
        <form onSubmit={handleSubmit}>
            <input type="text" name="query" />
            <button>🔍</button>
        </form>
    </section>

}