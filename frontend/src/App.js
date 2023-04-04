import { useEffect, useState } from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

import './App.css';
import Header from './modules/Header';
import Footer from './modules/Footer';
import Home from './pages/Home'
import Trips from './pages/Trips'
import Boats from './pages/Boats';
import BoatDetails from './pages/BoatDetails';
import Login from './pages/Login';
import Register from './pages/Register';

import { loadUser } from './actions/userAction';
import store from './store';
import Profile from './pages/Profile';
import UpdateProfile from './pages/UpdateProfile';
import UpdatePassword from './pages/UpdatePassword';
import ProtectedRoute from './components/route/ProtectedRoute';
import ForgotPassword from './pages/ForgotPassword';
import NewPassword from './pages/NewPassword';
import TripDetails from './pages/TripDetails';
import Reservation from './pages/Reservation';
import axios from 'axios';

function App() {

  const [stripeApiKey, setStripeApiKey] = useState('')

  useEffect(()=>{
    store.dispatch(loadUser())

    async function getStripeApiKey() {
      const { data } = await axios.get('/api/v1/stripeapi')
      setStripeApiKey(data.stripeApiKey)
    }

    getStripeApiKey()
  },[])

  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" Component={Home} exact />
          <Route path="/trips" Component={Trips} exact />
          <Route path="/trip/:id" Component={TripDetails} exact />
          <Route path="/boats" Component={Boats} exact/>
          <Route path="/boat/:id" Component={BoatDetails} exact/>
          <Route path="/login" Component={Login} exact/>
          <Route path="/register" Component={Register} exact/>
          <Route path="/password/forgot" Component={ForgotPassword} exact/>
          <Route path="/password/reset/:token" Component={NewPassword} exact/>
          <Route path="/profile" element={<ProtectedRoute>
            <Profile />
          </ProtectedRoute>} exact />
          <Route path="/profile/update" element={<ProtectedRoute>
            <UpdateProfile />
          </ProtectedRoute>} exact />
          <Route path="/password/update" element={<ProtectedRoute>
            <UpdatePassword />
          </ProtectedRoute>} exact />
          <Route path="/reservation" element={<ProtectedRoute>
            <Reservation />
          </ProtectedRoute>} exact />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
