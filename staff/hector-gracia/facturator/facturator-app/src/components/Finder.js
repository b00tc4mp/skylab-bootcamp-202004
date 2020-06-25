import React,{useState,useEffect} from 'react'
import './SearchPanel.sass'
import "./Commons.sass"

const {retrieveAllClients,retrieveAllProducts,makeDeliveryNote}= require("facturator-client-logic")


export default function ({goToEdition, type, allFinds,delivery, addTo ,back, remove}) {

    //Multi use variables
    const [query,setQuery]=useState("")
    const [selectedId,setSelection]=useState()
    const [results,setResults]= useState(allFinds)
    const [allResults, setAllResults]= useState()
    const [types, setTypes] = useState(type)

    const [findInstruction,setFindInstruction]=useState("")
    const [findHint,setFindHint]=useState("")
    const [header,setHeader]=useState("")
    

    //Client variables
    //Product variables
    //Delivery variables
    //Template variables

    useEffect(()=>{
        switch (type){
            case "clients":
                setFindInstruction("Buscar cliente: ")
                setFindHint("Nombre del cliente")
                setHeader("Clientes")
                break;
            case "products":
                setFindInstruction("Buscar producto: ")
                setFindHint("Nombre del producto")
                setHeader("Productos")
                break;
            case "deliveries":
                setFindInstruction("Buscar albarán: ")
                setFindHint("Nombre del cliente")
                setHeader("Albaranes")
                break;
            case "delivery/edit":
                setHeader(allFinds.client.name)
                setFindInstruction("Listado de productos del albarán")
                break;
            case "delivery/add":
                setHeader(delivery.client.name)
                setFindInstruction("Buscar producto: ")
                setFindHint("Nombre del producto")
                break;
            case "delivery/clients":
                setFindInstruction("Buscar cliente: ")
                setFindHint("Nombre del cliente")
                setHeader("Nuevo albarán")
            case "templates":
                setFindInstruction("Buscar plantilla: ")
                setFindHint("Nombre de la plantilla")
                setHeader("Plantillas")
        }
        filterFind()
    },[])
    useEffect(()=>{filterFind()},[query])//Update the find as you writte
    
    const filterFind=()=>{
        if(type!=="delivery/edit"){
            if(query){
                const filteredClients=allFinds.filter((currentFind)=>{ return currentFind.name.toLowerCase().includes(query.toLowerCase())})
                setResults(filteredClients)
            }else{
                setResults(allFinds)
            }
        }else{
            const res= allFinds.products.map(current=>{return current})
            setResults(res)
            
        }
    }
    const changeQuery=({target})=>{
        setQuery(target.value)
    }
    const handleGoToResultEdition=()=>{
        const result= results.find((current)=>{return current.id===selectedId})
        goToEdition(result)
    }
    const handleGoToClientCreation=()=>{
        goToEdition()
    }
    const handleGoToDeliveryAdition=()=>{
        goToEdition(allFinds)
    }
    const handleGoToDeliveryCreation=(useTemplate)=>{// if going to create an empty delivery or start with template
        addTo(useTemplate)
    }
    const handleAddTo=()=>{
        const productQuantity={productId:selectedId,quantity:5}
        addTo(productQuantity)
    }
    
    return <div className="search-panel">
                <div className="search-panel__top-bar"> 
                    {header}
                </div>
                <div className="search-panel__search-input">
                    {findInstruction}
                    {type!=="delivery/edit" && <input type="text" name="clientName" placeholder={findHint} value={query}  onChange={changeQuery} ></input>}
                </div>
                <div className="search-panel__search-result">
                    {results.length>0 && type!=="delivery/edit" &&
                        <ul>{results.map((value,index) => <div key={value.id} onClick={()=>{setSelection(value.id)}} className={ `search-result search-result__${(index % 2 ==0) ? "even" : "odd"} ${selectedId===value.id ? "search-result__highlighted" : ""}`}>
                            {type!=="deliveries" ? value.name: value.client.name}
                        </div> )}</ul>}
                    {results.length>0 && type==="delivery/edit" &&
                        <ul>{results.map((value,index) => <div key={value.id} onClick={()=>{setSelection(value.id)}} className={ `search-result search-result__${(index % 2 ==0) ? "even" : "odd"} ${selectedId===value.id ? "search-result__highlighted" : ""}`}>
                            {`${value.product.name} -------------------------------------${value.product.price}€/unidad------------------------------------------------------- ${value.quantity}Uds------------${value.quantity*value.product.price}€ `}
                        </div> )}</ul>}
                    {results.length<1 && <h2>No se ha encontrado nada</h2>}
                </div>
                {type==="clients" && <div className="search-panel__search-buttons">
                    <button className="search-button" onClick={handleGoToClientCreation} >
                        Crear nuevo cliente
                    </button>
                    <button className="search-button" disabled={!selectedId} onClick={handleGoToResultEdition} >
                        Editar cliente
                    </button>
                </div>}
                {type==="products" && <div className="search-panel__search-buttons">
                    <button className="search-button" onClick={handleGoToClientCreation} >
                        Crear nuevo producto
                    </button>
                    <button className="search-button" disabled={!selectedId} onClick={handleGoToResultEdition} >
                        Editar producto
                    </button>
                </div>}
                {type==="deliveries" && <div className="search-panel__search-buttons">
                    <button className="search-button" onClick={handleGoToDeliveryCreation} >
                        Crear nuevo albarán
                    </button>
                    <button className="search-button" onClick={()=>{return handleGoToDeliveryCreation(true)}} >
                        Crear albarán con plantilla
                    </button>
                    <button className="search-button" disabled={!selectedId} onClick={handleGoToResultEdition} >
                        Editar albarán
                    </button>
                    <button className="search-button" disabled={!selectedId} onClick={()=>{makeDeliveryNote(selectedId)}}>
                        Imprimir
                    </button>
                </div>}
                {type ==="delivery/edit" && <div className="search-panel__search-buttons">
                    <button className="search-button" onClick={handleGoToDeliveryAdition} >
                        Añadir nuevo producto
                    </button>
                    <button className="search-button" disabled={!selectedId} onClick={()=>{return remove(allFinds.id,selectedId).then(()=>{setSelection();setQuery(query+"a")})}} >
                        Quitar del albarán
                    </button>
                    <button className="search-button" onClick={back}>
                        Salir
                    </button>
                    <button className="search-button" onClick={()=>{makeDeliveryNote(allFinds.id)}}>
                        Imprimir
                    </button>
                </div>}
                {type ==="delivery/add" && <div className="search-panel__search-buttons">
                    <button className="search-button" disabled={!selectedId} onClick={handleAddTo} >
                        Añadir al albarán
                    </button>
                    <button className="search-button" onClick={goToEdition}>
                        Salir
                    </button>
                </div>}
                {type ==="delivery/clients" && <div className="search-panel__search-buttons">
                    <button className="search-button" disabled={!selectedId} onClick={()=>{addTo(selectedId)}} >
                        Seleccionar cliente
                    </button>
                    <button className="search-button" onClick={back}>
                        Descartar
                    </button>
                </div>}
                {type ==="templates" && <div className="search-panel__search-buttons">
                    <button className="search-button" onClick={addTo}>
                        Añadir plantilla
                    </button>
                    <button className="search-button" disabled={!selectedId} onClick={()=>{addTo(selectedId)}} >
                        Editar plantilla
                    </button>
                </div>}
            </div>
}