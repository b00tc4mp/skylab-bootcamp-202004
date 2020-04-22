function Search(callback){

    const temp = document.createElement('div')
    temp.innerHTML = ` <section> 
    <input id="search" type="text" name="search" placeholder="search">
    </section>`

    const container = temp
    const input = container.querySelector("#search")
    
    
    
    input.addEventListener("keyup", (event)=>{
       callback(event.target.value)

    
    })
 
    return container

}