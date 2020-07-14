// class Results extends Component {
//     constructor(users){
//         super(`<section class="results">
//         </section>`)

//         if(users.length) {
//             const list= document.createElement('ul')

//             users.forEach(({ name, surname, email }) => {
//                 const item = document.createElement('li')

//                 item.innerText = `${name} ${surname} - (${email})`

//                 list.appendChild(item)

//             })
//             this.container.appendChild(list)
//         }else this.container.appendChild(new Feedback('Sorry, No results were found', 'warning').container)
//     }
// }

function Results({users, loggedUser}){
    
    // const followingUsers = user.filter(if following)
    const checkFollow = (email, loggedUser)=> {
        debugger
        if(loggedUser.twitter.following)
            if(loggedUser.twitter.following.indexOf(email) !== -1)
             return 'Following'
            else
            return 'Follow'
    }

    const handleFollow = (email) => {
        debugger
        loggedUser.twitter.following.push(email)


        checkFollow(email, loggedUser)
    }

    return <section>
        
        {(() => {
            if(users.length)
                return <ul>{users.map(({ name, surname, email }) => <li>{`${name} ${surname} (${email})` }<button onClick={event => { event.preventDefault(); handleFollow(email)}}>{`${checkFollow(email, loggedUser)}`}</button></li>)}</ul>
            else return <Feedback message="sorry, no results :(" level="warning" />
        })()}
        
    </section>
}

{/* <button>{Follow/Following}</button> */}

 {/*(() => {
            if (users.length)
                return <ul>{users.map(({ name, surname, email }) => <li>{`${name} ${surname} (${email})`}</li>)}</ul>
            else return <Feedback message="sorry, no results :(" level="warning" />
        })()*/}