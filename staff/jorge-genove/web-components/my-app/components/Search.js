function Search() {
  const temp = document.createElement('div');

  temp.innerHTML = `<section class ="search">
        <form>
            <input type="text" name="query" ><button>Search</button>
        </form>
    </section>`


    const container = temp.firstChild;
    const form = container.querySelector('form')
     
   

    
    
    form.addEventListener('submit', function(event){debugger
        event.preventDefault();

        const query = event.target.query.value    
        const user = searchUsers(query);
        const result = Result(user)
        const resultList = document.getElementById('resultslist')
        if(resultList !== null) resultList.remove()
        
        if(result !== null)  container.appendChild(result)
       
        
    })
    return container;    
}
