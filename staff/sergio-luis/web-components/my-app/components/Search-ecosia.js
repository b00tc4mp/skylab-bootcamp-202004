class SearchEcosia extends Component {
    constructor(onSubmit){
        super(`<section class="search">
        <form class='search__form'>
            <img class='search__img' src='https://lh3.googleusercontent.com/proxy/NjHaekiwNEpaM-RALhpm6emRbQrQ129Dnj-xdUXd6ShaUs5PkDj6ifmvcF0LJfokP3aP3_S98TQXU9qXzGWruGnaDrrwJ4qcuS2XCzZwCwyu3NJiu0n3autCzsXTYyckv7M'>
            <div class='search__container'>
                <input class='search__input' type="text" name="query" required>
                <button class='search__button' >🌳</button>
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