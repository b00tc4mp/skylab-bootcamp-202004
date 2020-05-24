

 module.exports = () => {
        return `<h2>Add contact</h2>     
    <form action="/add-contact" method="POST">                 
    <input type="text" name="country">   
    <input type="text" name="name">                 
    <input type="text" name="surname">                 
    <input type="email" name="email">                 
    <input type="text" name="phone">   
    <input type="date" name="date">
    
    <button>Add</button>
    </form>`
}