const { useState, useEffect } = React

function FavSpotsList({ token }) {

    const [favSpots, setFavSpots] = useState()

    useEffect(() => {
        favList(token, (error, favSpots) => {
            if (error) throw new TypeError('error')

            setFavSpots(favSpots)
        })
    }, [token])

    return <section>

        {
            favSpots ? (<>

                <ul>
                    {favSpots.map((element) => {
                        return <li >{`${element}`}</li>
                    })}
                </ul>
            </>)
                : (
                    <Feedback message="sorry, no results :(" />
                )
        }
    </section>
}