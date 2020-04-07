import React,{Fragment} from 'react';
import './App.css';
import Index from './component/layouts/Index'
import {Route,Switch} from "react-router-dom"
import Navbar from "./component/layouts/Navbar"
import Lyrics from "./component/tracks/Lyrics"

const App=()=> {
  return (
    <Fragment>
      <Navbar/>
        <Switch>
          <Route exact path="/" component={Index}/>
          <Route path="/lyrics/track/:id" component={Lyrics}/>
        </Switch>
    </Fragment>
  );
}

export default App;
