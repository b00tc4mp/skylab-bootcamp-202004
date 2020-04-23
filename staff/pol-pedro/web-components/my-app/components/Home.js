function Home(name, surname, goBack, onSearch, timer) {

    
    const temp = document.createElement('div')

    temp.innerHTML = `<section class="home">
    <h1>Welcome, ${name} ${surname} </h1><button>Logout</button>
        <section class="home__search">
            <form>
                <input type="text" name="search">
                <button>search</button>
            </form>
            <ul></ul>
        </section>
    </section>`

// || Variables declaration ||
    const container = temp.firstChild
    const button = container.querySelector('button') 
    const searchContainer = temp.children[0].children[2]
    const form = searchContainer.querySelector('form')
    const input = searchContainer.querySelector('input')
    let feedback
    let searched
    let num = 0
// || Functions and event listeners ||

    function clean() { //cleans the inputs and error messages
        form.search.value = '';
        if (typeof feedback !== 'undefined') {
            searchContainer.removeChild(feedback)
            feedback = undefined
        }
    }

    function cleanSearch() { //clean the founded users list when a new search is done
        if (typeof searched !== 'undefined'){
            while (searchContainer.children[1].hasChildNodes()) {
                searchContainer.children[1].removeChild(searchContainer.children[1].firstChild)
              }
            searched = undefined
        }
    }

    button.addEventListener('click', function() {
        goBack()
    })

    form.addEventListener('input', function(event){
        var theName = form.search.value
        cleanSearch()
        try{
            let results = onSearch(theName)
            for (var i = 0; i < results.length; i++){
                searched = Results(results[i].name, results[i].surname, results[i].email)
                searchContainer.children[1].append(searched);
            }
            //clean error message only
            if (typeof feedback !== 'undefined') {
                searchContainer.removeChild(feedback)
                feedback = undefined
            }
        }catch(error){
            if (!feedback) {
                feedback = Feedback(error.message, 'error')
                searchContainer.append(feedback)
            }else feedback.innerText = error.message //cambia el mesaje de error si se da el caso
        }
    })

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        var theName = event.target.search.value
        cleanSearch()
        try{
            let results = onSearch(theName)
            for (var i = 0; i < results.length; i++){
                searched = Results(results[i].name, results[i].surname, results[i].email)
                searchContainer.children[1].append(searched);
            }
            clean();
        }catch(error){
            if (!feedback) {
                feedback = Feedback(error.message, 'error')
                searchContainer.append(feedback)
            }else feedback.innerText = error.message //cambia el mesaje de error si se da el caso
        }
    })

    return container
}