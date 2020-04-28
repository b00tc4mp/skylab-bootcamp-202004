// class Wired extends Component {
//     constructor(onSubmit) {
//         super(`<section class="search">
//         <form>
//         <br>
//             <label for="news">Latest news about:</label>
//         <br>
//             <select name="news" id="news">
//             <option value="artificial-intelligence">Artificial Intelligence</option>
//             <option value="virtual-reality">Virtual Reality</option>
//             <option value="amazon">Amazon</option>
//             <option value="google">Google</option>
//             <option value="apple">Apple</option>

//             </select>
            // <button>👨🏻‍💻</button>
        // </form>
//         </section>`)

//         const form = this.container.querySelector('form')

//         form.addEventListener('submit', (event) => {
//             event.preventDefault()

//             const query = event.target.news.value
//             onSubmit(query)
//         })
//     }
// }

function Wired() {
    return <h1>I'm wired search!</h1>
}