class Home extends Component{ //se bugea el buscador con el spiner cuando se introduce solo una letra
    constructor(props) {
        super(props)
        this.state = {error: ''}
    }

    handelSubmit = (event) => { //handel errors
        event.preventDefault()
        let searchValue = event.target.search.value
        if(searchValue.length > 0){
            this.props.loadSpiner()
            try{
                lookUsers(searchValue, this.props.token, (error, results) => {
                    if(error){
                        this.props.loadSpiner()
                        this.props.onUsers(undefined, '')
                        return this.setState({error: error})
                        
                    }
                    else{
                        this.props.onUsers(results, searchValue)
                        this.props.loadSpiner()
                        this.setState({error: ''})
                        
                    }
                })
            }catch({message}){
                this.props.loadSpiner()
                this.props.onUsers(undefined, '')
                this.setState({error: message})
                
            }
        }else{
            this.props.onUsers(undefined, '') //to cleand the search when we have an error
        }
    }
    //onInput = {this.handelSubmit}
    render = () =>{
        return <section class="home">
        <section class="home__search">
            <form onSubmit = {this.handelSubmit} > 
                <input type="text" name="search" placeholder={`search Users`}/>
                <button class="search">search</button>
                {/* <h2 button="change">${onNav}</h2> */}
            </form>
            {this.props.spiner && <i className={this.props.spiner}></i>}
            {this.state.error && <Feedback message={this.state.error} level="error" />}
        <ul>
            {this.props.results && <ResultsUser results = {this.props.results}/>}
        </ul>
        </section>
        </section>
    }
}
















// class Home extends Component{

//     constructor (name, surname, goBack, onSearch) {
//         super(`<section class="home">
            
//             <section class="home__search">
//                 <form>
//                     <input type="text" name="search" placeholder="Search Users">
//                     <button>Search</button>
//                     <button class="logout">Logout</button>
//                 </form>
//                 <ul></ul>
//             </section>
//         </section>`)
//     // || Variables declaration DOM||
//         //const button = this.container.querySelector('button') 
//         const searchContainer = this.container.children[0] //temp.children[0]
//         const button = searchContainer.querySelector('.logout') 
//         const form = searchContainer.querySelector('form')
//         const input = searchContainer.querySelector('input')
//         const deletCont = landing.container.querySelector('section')
//         let google = new GoogleComp ('google', 'Bing')
//         const navSelector = google.container.children[0].children[0].querySelector('h2')

//         // ||clasic variables ||

//         let style = document.createElement('style');
//         let feedback //123123123
//         let searched
//         let searchUser = false
//         let searchGoogle = false
//         let num = 0
//         let navigatorState = false
//     // || Functions and event listeners ||

//         //inject username in the header

//         deletCont.appendChild(style);
//         style.sheet.insertRule('.header__landing a{display: none}')
//         style.sheet.insertRule('.header__landing i{display: inline}')
//         const user = new UserName (name, surname)
//         deletCont.append(user.container)
//         const userTag = landing.container.querySelector('h2')
//         const searchTag = landing.container.querySelector('i')
        

//         function clean() { //cleans the inputs and error messages
//             form.search.value = '';
//             if (typeof feedback !== 'undefined') {
//                 searchContainer.removeChild(feedback.container)
//                 feedback = undefined
//             }
//         }

//         function cleanSearch() { //clean the founded users list when a new search is done
//             if (typeof searched !== 'undefined'){
//                 while (searchContainer.children[1].hasChildNodes()) {
//                     searchContainer.children[1].removeChild(searchContainer.children[1].firstChild) //123123123
//                 }
//                 searched = undefined
//             }
//         }

//         navSelector.addEventListener('click', function(){
//             if(navigatorState === false){
//                 google.container.replaceWith(google = new GoogleComp ('bing', 'google'))
//                 navigatorState = true
//             }
//             else{
//                 google.container.replaceWith(google = new GoogleComp ('google', 'bing'))
//                 navigatorState = false
//             }
            
//         })


//         searchTag.addEventListener('click', (event) =>{ //para abrir y cerrar el buscador
//             if(!searchGoogle){
//                 document.getElementById('root').insertBefore(google.container, news.container) //document.getElementById('root').appendChild(this.container)
//                 searchGoogle = true
//             }else{
//                 document.getElementById('root').removeChild(google.container)
//                 searchGoogle = false
//             }
//             })

//         userTag.addEventListener('click', (event) =>{ //para abrir y cerrar el buscador
//             if(!searchUser){
//                 document.getElementById('root').insertBefore(this.container, news.container) //document.getElementById('root').appendChild(this.container)
//                 searchUser = true
//             }else{
//                 document.getElementById('root').removeChild(this.container)
//                 searchUser = false
//             }
//         })


//         button.addEventListener('click', function() {
//             goBack()
//             deletCont.removeChild(user.container) //delet header username for in case of new login

//         })

//         form.addEventListener('input', function(event){ //se podria crear una fucion de esto para ahorrar algo de codigo
//             var theName = form.search.value
//             cleanSearch()
//             try{
//                 let results = onSearch(theName)
//                 for (var i = 0; i < results.length; i++){
//                     searched = new Results(results[i].name, results[i].surname, results[i].email)
//                     searchContainer.children[1].append(searched.container);
//                 }
//                 //clean error message only
//                 if (typeof feedback !== 'undefined') {
//                     searchContainer.removeChild(feedback.container)
//                     feedback = undefined
//                 }
//             }catch(error){
//                 if (!feedback) {
//                     feedback = new Feedback(error.message, 'error')
//                     searchContainer.append(feedback.container)
//                 }else feedback.container.innerText = error.message //cambia el mesaje de error si se da el caso
//             }
//         })

//         form.addEventListener('submit', function(event) {
//             event.preventDefault();
//             var theName = event.target.search.value
//             cleanSearch()
//             try{
//                 let results = onSearch(theName)
//                 for (var i = 0; i < results.length; i++){
//                     searched = new Results(results[i].name, results[i].surname, results[i].email)
//                     searchContainer.children[1].append(searched.container);
//                 }
//                 clean();
//             }catch(error){
//                 if (!feedback) {
//                     feedback = new Feedback(error.message, 'error')
//                     searchContainer.append(feedback.container)
//                 }else feedback.container.innerText = error.message //cambia el mesaje de error si se da el caso
//             }
//         })
//     }
// }