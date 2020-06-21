import React,{useState,useEffect} from 'react'
import './SearchPanel.sass'
import "./Commons.sass"

const {retrieveAllClients,retrieveAllProducts,makeDeliveryNote}= require("facturator-client-logic")


export default function ({goToEdition, type }) {

    //Multi use variables
    const [query,setQuery]=useState("")
    const [selectedId,setSelection]=useState()
    const [results,setResults]= useState([])
    const [allResults, setAllResults]= useState([])
    const [types, setTypes] = useState(type)

    //Client variables
    const [clients,setClients]=useState([])
    const [allClients,setAllClients]=useState([])
    //Product variables
    const [products, setProducts]= useState([])
    const [allProducts,setAllProducts]= useState([])

    //Delivery variables

    //Template variables
    useEffect(()=>{
        getAll(); 
        //filterClients()
    },[])
    useEffect(()=>{filterClients()},[query])
    
    const getAll=()=>{
        try {
            switch(type){
                case "clients":
                    retrieveAllClients()
                        .then(_clients=>{
                            let newClients=[]
                            for(let i=0;i<_clients.length;i++){
                                newClients.push(_clients[i])
                            }
                            setAllClients(newClients)
                            return
                        })
                        .catch(error=>console.log(error))  
            }
             
        } catch (error) {
            console.log(error)
        }
    }
    const filterClients=()=>{
        if(query){
            const filteredClients=allClients.filter((currentClient)=>{ return currentClient.name.toLowerCase().includes(query.toLowerCase())})
            setClients(filteredClients)
        }else{
            setClients(allClients)
        }
    }
    const changeQuery=({target})=>{
        setQuery(target.value)
    }
    const handleGoToClientEdition=()=>{
        const client= clients.find((current)=>{return current.id===selectedId})
        goToEdition(client)
    }
    const handleGoToClientCreation=()=>{
        goToEdition()
    }
    
    return <div className="search-panel">
                <div className="search-panel__top-bar">
                    {`${type}`}
                </div>
                <div className="search-panel__search-input">
                    Buscar cliente: 
                    <input type="text" name="clientName" placeholder="Nombre del cliente" value={query}  onChange={changeQuery} ></input>
                </div>
                <div className="search-panel__search-result">
                    {clients.length>0 ?
                        <ul>{clients.map((value,index) => <div key={value.id} onClick={()=>{setSelection(value.id)}} className={ `search-result search-result__${(index % 2 ==0) ? "even" : "odd"} ${selectedId===value.id ? "search-result__highlighted" : ""}`}>
                            {value.name}
                        </div> )}</ul>
                    : <h2>No se ha encontrado nada</h2>}
                </div>
                <div className="search-panel__search-buttons">
                    <button className="search-button" onClick={handleGoToClientCreation} >
                        Crear nuevo cliente
                    </button>
                    <button className="search-button" disabled={!selectedId} onClick={handleGoToClientEdition} >
                        Editar cliente
                    </button>
                    <button className="search-button" onClick={()=>{makeDeliveryNote("Cosa que he escrito to loca")}}>
                        Imprimir
                    </button>
                </div>
            </div>
}