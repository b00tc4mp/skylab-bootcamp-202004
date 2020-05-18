class SearchGoogle extends Component {
    constructor(onSubmit){
        super(`<section class="search">
        <form class='search__form'>
            <img class='search__img' src='https://pngimage.net/wp-content/uploads/2018/06/google-imagens-png-8.png'> 
            <div class='search__container'>
                <input class='search__input' type="text" name="query" required>
                <button class='search__button' >🔍</button>
            </div>
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