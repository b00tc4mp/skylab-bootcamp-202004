function Tweet ({onSubmit}){
    return <section className = "tweet">
       <form onSubmit = {event =>{
           event.preventDefault()

           onSubmit()
       }}>
       <input type="text" name="tweet"></input>
       <button>Tweet</button>
       </form>
    </section>
}