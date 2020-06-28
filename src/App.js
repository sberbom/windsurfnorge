import React from 'react';
import SBNavbar from './components/navbar'
import Home from './pages/home'
import AllSpots from './pages/allSpots';
import MapView from './pages/mapView';
import Spot from './pages/spot'
import Footer from './components/footer';
import AddSpot from './pages/addSpot';
import { Switch, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';


function App() {
  return (
    <div>
      <SBNavbar/>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/home">
          <Home />
        </Route>
        <Route path="/map">
          <MapView/>
        </Route>
        <Route path="/spot">
          <Spot/>
        </Route>
        <Route path="/addSpot">
          <AddSpot/>
        </Route>
        <Route path="/allSpots">
          <AllSpots/>
        </Route>
      </Switch>
      <Footer/>
    </div>
  );
}

export default App;
