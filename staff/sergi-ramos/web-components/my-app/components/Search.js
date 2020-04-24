class Search extends Components {
    constructor() {
        super(`<section class="search">
                    <form>
                        <label>User search<input type="text" name="query"></label>
                        <button>🔍</button><br>
                        <label>Google Search<input type="text" name="queryGoogle"></label>
                        <button>🔍</button>
                    </form>
                </section>`)
    }
}