class GoogleComp extends Component{

    constructor (navigator, onNav) {
        super(`<section class="home">
            <section class="home__search">
                <form>
                    <input type="text" name="search" placeholder="search in ${navigator}">
                    <button class="search">search</button>
                    <h2 button="change">${onNav}</h2>
                </form>
                <ul></ul>
            </section>
        </section>`)
    // || Variables declaration ||

        const button = this.container.querySelector('.search') 
        const searchContainer = this.container.children[0] //temp.children[0]
        const form = searchContainer.querySelector('form')
        let feedback
        let searched
    // || Functions and event listeners ||


        function clean() { //cleans the inputs and error messages
            form.search.value = '';
            if (typeof feedback !== 'undefined') {
                searchContainer.removeChild(feedback.container)
                feedback = undefined
            }
        }

        function cleanSearch() { //clean the founded users list when a new search is done
            if (typeof searched !== 'undefined'){
                while (searchContainer.children[1].hasChildNodes()) {
                    searchContainer.children[1].removeChild(searchContainer.children[1].firstChild) //123123123
                }
                searched = undefined
            }
        }

        form.addEventListener('submit', (event) => {
            event.preventDefault();
            var theName = event.target.search.value
            cleanSearch()
            try{
                if(navigator === 'google'){

                    google(theName, (results)=>{
                        for (var i = 0; i < results.length; i++){
                            searched = new GoogleResults(results[i].textTitle, results[i].textContent, results[i].link)
                            searchContainer.children[1].append(searched.container)
                        }
                    })
                }else{
                    bing(theName, (results)=>{
                        for (var i = 0; i < results.length; i++){
                            searched = new GoogleResults(results[i].textTitle, results[i].textContent, results[i].link)
                            searchContainer.children[1].append(searched.container)
                        }
                    })
                }

                clean();
            }catch(error){
                if (!feedback) {
                    feedback = new Feedback(error.message, 'error')
                    searchContainer.append(feedback.container)
                }else feedback.container.innerText = error.message //cambia el mesaje de error si se da el caso
            }
        })
    }
}