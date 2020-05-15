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
                    document.body.scrollTop = 0;
                    document.documentElement.scrollTop = 0;
                }}>{number}</button>
            )
        }
    </section>
}