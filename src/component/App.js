import React from "react";
import {BrowserRouter as Router, Route} from "react-router-dom";
import Alllist from "./Alllist";
import Header from "./Header"
import Specificlist from "./Specificlist"
import "./styles.css"



const App = () =>{

  return (
    <Router>
      <Header/>

      <Route path="/" exact>
        <Alllist/>
      </Route>

      <Route path="/:name">
        <Specificlist/>
      </Route>

    </Router>
    
  )
}

export default App;
