import React,{useState} from 'react';
import './App.css';
import Landing from "./Landing"
import "./Commons.sass"
import NavigationBar from "./NavigationBar"
import Searcher from "./Finder"
import Editor from "./Editor" 
const {retrieveAllClients,retrieveAllProducts,retrieveAllDeliveries, retrieveDelivery, addProductToDelivery,removeProductFromDelivery,makeEmptyDelivery, retrieveAllDeliveryTemplates}= require("facturator-client-logic")
function App() {
  const[view, setView]= useState("landing") // If the View is from clients, products, deliverys or templates
  const[action, setAction]= useState() // If finding, editing or creating new data

  const [selection, setSelection]= useState() // Client that is selected 
  const [allFinds, setAllFinds]= useState() //It can be all Products, all Clients, all templates ...
 
  const handleChangeview=(newView)=>{
    switch (newView){
      case "clients":
        handelFindClients()
        break;
      case "products":
        handleFindProducts()
        break;
      case "deliveries":
        handleFindDeliveries()
        break;
      case "templates":
        handelFindDeliveryTemplates()
        break;
    }
  }
  
  const handleGoToFinder=()=>{
    setAction("find")
  }
  //////////////////
  //Handle finders//
  //////////////////
  const handleFindProducts=()=>{
    return retrieveAllProducts()
      .then(products=>{
        setAllFinds(products)
        setView("products")
        setAction("find")
      })
  }
  const handelFindClients=()=>{
    return retrieveAllClients()
      .then(clients=>{
        setAllFinds(clients)
        setView("clients")
        setAction("find")
      })
  }
  const handleFindDeliveries=()=>{
    return retrieveAllDeliveries()
      .then(deliveries=>{
        setAllFinds(deliveries)
        setView("deliveries")
        setAction("find")
      })
  }
  const handleFindProductToDelivery=(_delivery)=>{
    return retrieveAllProducts()
      .then(products=>{
        setSelection(_delivery)
        setAllFinds(products)
        setView("delivery/add")
        setAction("find")
      })
  }
  const handleFindDeliveryClients=()=>{
    try {
      return retrieveAllClients()
        .then(clients=>{
          setAllFinds(clients)
          setView("delivery/clients")
          setAction("find")
        })
        .catch(error=>console.log(error))
    } catch (error) {
      console.log(error)
    }
  }
  const handelFindDeliveryTemplates=()=>{
    try {
      return retrieveAllDeliveryTemplates()
        .then(templates=>{
          setAllFinds(templates)
          setView("templates")
          setAction("find")
        })
        .catch(error=>{console.log(error)})
    } catch (error) {
      console.log(error) 
    }
  }
  
  //////////////////
  //Handle editors//
  //////////////////

  //Could be refactor into one function
  const handleGoToClientEdition=(_client)=>{
    setSelection(_client)
    setAction("edit")
  }
  const handleGoToProductEdition=(_product)=>{
    setSelection(_product)
    setAction("edit")
  }
  const handleGoToDeliveryEdition=(_edition)=>{
    try{
      return retrieveDelivery(_edition.id)
        .then((delivery)=>{
          setSelection(_edition)
          setAllFinds(delivery)
          setView("delivery/edit")
          setAction("find")
          return
        })
    }catch(error){
      console.error(error)
    }
  }
  const handleGoToTemplateAdition=()=>{
    setAction("edit")
  }

  //////////////////
  //Handle adition//
  //////////////////
  const handleAddToDelivery=(productQuantity)=>{
    try {
      return addProductToDelivery(selection.id,productQuantity)
        .then(()=>{
           return handleGoToDeliveryEdition(selection)
        })
        .catch(error=>{console.log(error)})
    } catch (error) {
      console.log(error)
    }
  }
  const handleRemoveFromDelivery=(deliveryId,productQuantityId)=>{
    try{
      return removeProductFromDelivery(deliveryId,productQuantityId)
        .then(()=>{return handleGoToDeliveryEdition(selection)})
        .catch(error=>console.log(error))
    }catch(error){
      console.log(error)
    }
  }
  const handleNewDelivery=(clientId)=>{
    try {
      return makeEmptyDelivery(clientId)
        .then(()=>{return handleFindDeliveries()})
        .catch(error=>{console.log(error)})
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div>
      <NavigationBar currentView={view} changeView={handleChangeview} ></NavigationBar>
      {view==="clients" && action==="find" && <Searcher type={view} goToEdition={handleGoToClientEdition} allFinds={allFinds}></Searcher>}
      {view==="products" && action==="find" && <Searcher type={view} goToEdition={handleGoToProductEdition} allFinds={allFinds}></Searcher>}
      {view==="deliveries" && action==="find" && <Searcher type={view} goToEdition={handleGoToDeliveryEdition} addTo={handleFindDeliveryClients} allFinds={allFinds}></Searcher>}
      {view==="templates" && action==="find" && <Searcher type={view} goToEdition={handleGoToDeliveryEdition} addTo={handleGoToTemplateAdition} allFinds={allFinds}></Searcher>}
      {view==="delivery/clients" && action==="find" && <Searcher type={view} goToEdition={handleGoToDeliveryEdition} addTo={handleNewDelivery} back={handleFindDeliveries} allFinds={allFinds}></Searcher>}
      {view==="delivery/edit" && action==="find" && <Searcher type={view} goToEdition={handleFindProductToDelivery} back={()=>{handleChangeview("deliveries")}} remove={handleRemoveFromDelivery} allFinds={allFinds}></Searcher>}
      {view==="delivery/add" && action==="find" && <Searcher type={view} goToEdition={()=>{handleGoToDeliveryEdition(selection)}} addTo={handleAddToDelivery} delivery={selection} allFinds={allFinds}></Searcher>}
      {view==="clients" && action==="edit" && <Editor type={view} backToFinder={handelFindClients} client={selection}></Editor>}
      {view==="products" && action==="edit" && <Editor type={view} backToFinder={handleFindProducts} product={selection}></Editor>}
      {view==="templates" && action==="edit" && <Editor type={view} backToFinder={handelFindDeliveryTemplates} ></Editor>}

    </div>
  );
}

export default App;
