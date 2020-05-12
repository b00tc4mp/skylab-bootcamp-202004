function UserCard({nickname, email, myCards}) {
    return <>
        <div class='user-card-container'>
            <section class="card-container__section">
                <h1 class='card-container__name card-container__title'>ALex}</h1>
                <div class="card-container__frame-art-container">
                    <img class='card-container__frame-art' src='https://i.blogs.es/eadad8/chandra/450_1000.jpg' alt='jace art'/>
                </div>
                <h1 class="tcard-container__type card-container__title">alexxx</h1>
                <div class="card-container__nav">
                    <a class="card-container__nav-item" href=""><h1>Follow</h1></a>
                    <a class="card-container__nav-item" href=""><h1>View Profile</h1></a>
                </div>
            </section>
        </div>
    </>
}