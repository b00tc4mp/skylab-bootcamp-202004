class SearchGoogle extends Component {
    constructor(onSubmit){
        super(`<section class="search">
        <form class='search__form'>
            <h2>Google</h2> 
            <input class='search__input' type="text" name="query">
            <button class='search__button' >🔍</button>
        </form>
    </section>`)

        const form = this.container.querySelector('form');

        form.addEventListener('submit', event =>{
            event.preventDefault();

            const query = event.target.query.value;

            onSubmit(query);
        })
    }
}