const {useState} = React

function Pages({ pages, handleCurrentPage }) {
    // const [currentPage, setCurrentPage] = useState(1)

    function handleClick(_id){
       handleCurrentPage(_id)
    }

    return <section className="news__pages">
            {
                pages.map(number => 
                    <button id={`${number}`} key={number} onClick={event=>{
                        event.preventDefault()
                        let _id = event.target.id
                        handleClick(_id)}}>{number}</button>
                )
            }
    </section>
}