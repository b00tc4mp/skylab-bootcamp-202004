const { useState } = React

function Pages({ pages, handleCurrentPage }) {

    function handleClick(_id) {
        handleCurrentPage(_id)
    }

    return <section className="pages">
        {
            pages.map(number =>
                <button className={`pages__button ${handleCurrentPage === number ? 'pages__button--active' : ''}`} id={`${number}`} key={number} onClick={event => {
                    event.preventDefault()
                    const _id = event.target.id
                    handleClick(_id)
                }}>{number}</button>
            )
        }
    </section>
}