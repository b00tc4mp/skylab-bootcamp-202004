function Results({ users, handleFollow }) {
    return <section className="results">
        {
            users.length ? (<>
                <ul>{users.map(({ name, surname, email, id }) => (
                    
                    <li>
                        {`${name} ${id} ${surname} (${email})`}<button onClick={event => {
                        event.preventDefault();
                        handleFollow(id);
                        
                    }}>Follow</button></li>

                    
                ))}</ul>
            </>) : <Feedback message="sorry, no results :(" level="warning" />
        }
    </section>
}



/*  function handleFollow(event){
 console.log(event.id.value);
 console.log(event.target.id.value);

}
*/
//<buttom onClick={handlenoseke(id)}></buttom>
//<buttom onClick= {()=>{handlenoske(id)}}></buttom>