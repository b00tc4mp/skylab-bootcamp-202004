import React,{useState} from 'react';
import './App.css';
import Landing from "./Landing"
import "./Commons.sass"
import NavigationBar from "./NavigationBar"
import Searcher from "./Finder"
import Editor from "./Editor" 
function App() {
  const[view, setView]= useState("landing") // If the View is from clients, products, deliverys or templates
  const[action, setAction]= useState() // If finding, editing or creating new data

  const [client, setClient]= useState() // Client that is selected 
 
  const handleChangeview=(newView)=>{
    setView(newView)
    setAction("find")
  }
  const handleGoToClientEdition=(_client)=>{
    setClient(_client)
    setAction("edit")
  }
  const handleGoToFinder=()=>{
    setAction("find")
  }
  return (
    <div>
      <NavigationBar currentView={view} changeView={handleChangeview} ></NavigationBar>
      {view!=="landing" && action==="find" && <Searcher type={view} goToEdition={handleGoToClientEdition}></Searcher>}
      {view!=="landing" && action==="edit" && <Editor backToFinder={handleGoToFinder} client={client}></Editor>}

    </div>
  );
}

export default App;
