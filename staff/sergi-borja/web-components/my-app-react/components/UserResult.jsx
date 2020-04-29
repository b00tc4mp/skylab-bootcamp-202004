function UserResult({input}){
    return <section className = 'results'>
       <ul>{input.length?
       input.map(({name, surname, email}) => <li>{`${name}${surname}, ${email}`}</li>) : 
       <Feedback message = 'No users found' level = 'warning'/>}</ul>
   </section>
}