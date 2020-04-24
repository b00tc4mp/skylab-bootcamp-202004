class Search extends Component {
    constructor (onSubmit) {
  super( `<section class="search">
    <form>
        <input type="text" name="query">
        <button>🔍</button>
    </form>
</section>`)

    const form = container.querySelector('form')
   
    form.addEventListener('submit', event => {
        event.preventDefault();

        const query = event.target.query.value;
      
        try {
        let resultQuery = callback(query);
        result = Results(resultQuery);
        count++
        if(count ===1){
           container.appendChild(result)
        }else{
            let last = container.lastChild
            container.removeChild(last)
            container.appendChild(result)
        }
            
        } catch (error) {
            if (!feedback) {
                console.log(error.message);
      
            }
        }
    })


    }
}