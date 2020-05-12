const {useState} = React

function Pages({ pages, handleCurrentPage }) {
    // const [currentPage, setCurrentPage] = useState(1)

    function handleClick(_id){
       handleCurrentPage(_id)
    }

    //revisar cambiar el class name dependiendo en que pagina estamos
    return <section className="pages">
            {
                pages.map(number => 
                    <button className={`pages__button ${handleCurrentPage === number ? 'pages__button--active':''}`} id={`${number}`} key={number} onClick={event=>{
                        event.preventDefault()
                        let _id = event.target.id
                        handleClick(_id)}}>{number}</button>
                )
            }
    </section>
}