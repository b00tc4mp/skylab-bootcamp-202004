function Search() {

    const temp = document.createElement('div')

    temp.innerHTML = `<section class="search">
                        <form>
                            <input type="text" name="query">
                            <button>🔍</button>
                        </form>
                    </section>`


    const container = temp.firstChild
   
    return container
}