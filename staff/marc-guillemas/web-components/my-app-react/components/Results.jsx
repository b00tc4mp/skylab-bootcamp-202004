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

function Results({users}){
    return <section>
        
        {(() => { debugger
            if(users.length)
                return <ul>{users.map(({ name, surname, email }) => <li>{`${name} ${surname} (${email})`}</li>)}</ul>
            else return <Feedback message="sorry, no results :(" level="warning" />
        })()}
        
    </section>
}

 {/*(() => {
            if (users.length)
                return <ul>{users.map(({ name, surname, email }) => <li>{`${name} ${surname} (${email})`}</li>)}</ul>
            else return <Feedback message="sorry, no results :(" level="warning" />
        })()*/}