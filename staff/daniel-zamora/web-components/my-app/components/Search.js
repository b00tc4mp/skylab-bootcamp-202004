function Search(callback) {
    const temp = document.createElement('div')

    temp.innerHTML = `<section class="search">
    <form>
        <input type="text" name="query">
        <button>🔍</button>
    </form>
</section>`

    const container = temp.firstChild

    const form = container.querySelector('form')

    let feedback
    let result
    let count=0;
   
    form.addEventListener('submit', function(event) {
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

    function cleanUp() {
        form.query.value = ''


    }

    return container
}