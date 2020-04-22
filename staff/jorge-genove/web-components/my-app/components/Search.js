class Search extends Components {
    constructor(onSubmit) {
    super(`<section class ="search">
    <form>
        <input type="text" name="query" ><button>Search</button>
    </form>
</section>`)
    const form = this.container.querySelector('form')
     
    form.addEventListener('submit', function(event){debugger
        event.preventDefault();

        const query = event.target.query.value    
        
        onSubmit(query)
    })
   
}
}