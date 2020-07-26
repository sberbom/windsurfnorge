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
import UserProvider from './providers/userProvider';


function App() {
  return (
    <div>
      <UserProvider>
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
      </UserProvider>
    </div>
  );
}

export default App;
