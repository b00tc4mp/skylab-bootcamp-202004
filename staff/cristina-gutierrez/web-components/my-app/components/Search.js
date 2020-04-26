class Search extends Component {
    constructor(onSubmit) {
        super(`<section class="search">
            <form>
                <input type="text" name="query">
                <button type="submit">🔍</button>
            </form>
        </section>`)

        const form = this.container.querySelector('form');
        
        form.addEventListener('submit', (event) => {
            event.preventDefault();
    
            const query = event.target.query.value;
    
            onSubmit(query)
        });
    }
};