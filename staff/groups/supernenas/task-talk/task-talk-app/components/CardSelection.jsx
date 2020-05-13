function CardSelection({activities,toEdit}){
    function handleToEdit(id){
        toEdit(id);
    }
    return <section className="group__card group__card--preview">
        {
            activities.length>0 ? <ul>{activities.map((activity)=>{//cambiar id
                return <CardPreview key={activity.id} id={activity.name} title={activity.name} message={activity.desc} 
                toEdit={handleToEdit} />
            })}</ul>: <Feedback message="No results found" level="warning"/>
        }
    </section>
}