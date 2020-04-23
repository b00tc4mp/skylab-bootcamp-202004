class Search extends Component{
    constructor(onSubmit){
        super(`<section class="search">
            <form>
             <input type="text" name="query">
                <button>🦗</button>
            </form>
         </section>`)
    
        const form = this.container.querySelector('form')
        // const searchCont = this
        form.addEventListener('submit', event=>{
            event.preventDefault();
            
            var input = event.target.query.value
            onSubmit(input)
             
        })
    }
}

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