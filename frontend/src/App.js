import { useEffect } from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

import './App.css';
import Header from './modules/Header';
import Footer from './modules/Footer';
import Home from './pages/Home'
import Boats from './pages/Boats';
import BoatDetails from './pages/BoatDetails';
import Login from './pages/Login';
import Register from './pages/Register';

import { loadUser } from './actions/userAction';
import store from './store';
import Profile from './pages/Profile';

function App() {

  useEffect(()=>{
    store.dispatch(loadUser())
  },[])

  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" Component={Home} exact />
          <Route path="/boats" Component={Boats} exact/>
          <Route path="/boat/:id" Component={BoatDetails} exact/>
          <Route path="/login" Component={Login} exact/>
          <Route path="/register" Component={Register} exact/>
          <Route path="/profile" Component={Profile} exact/>
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
