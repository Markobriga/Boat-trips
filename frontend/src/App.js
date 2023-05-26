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
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import MyReservations from './pages/MyReservations';
import Dashboard from './pages/Dashboard';
import NewOwner from './pages/NewOwner';
import OwnersList from './pages/OwnersList';
import MyBoat from './pages/MyBoat';
import MyTrips from './pages/MyTrips';
import NewTrip from './pages/NewTrip';
import UpdateTrip from './pages/UpdateTrip';
import MyBookers from './pages/MyBookers';
import NewBooker from './pages/NewBooker';
import Blog from './pages/Blog';
import PostDetails from './pages/PostDetails';
import BlogAdmin from './pages/BlogAdmin';
import NewPost from './pages/NewPost';
import UpdatePost from './pages/UpdatePost';
import TripReservations from './pages/TripReservations';
import AboutUs from './pages/AboutUs';

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
      <div className="App bg-gray-100 min-h-screen flex flex-col">
        <Header />
        <div className='flex-1'>
        <Routes>
          <Route path="/" Component={Home} exact />
          <Route path='/blog' Component={Blog} exact />
          <Route path='/blog/:id' Component={PostDetails} exact />
          <Route path="/trips" Component={Trips} exact />
          <Route path="/trip/:id" Component={TripDetails} exact />
          <Route path="/boats" Component={Boats} exact/>
          <Route path="/boat/:id" Component={BoatDetails} exact/>
          <Route path="/aboutus" Component={AboutUs} exact/>
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
          <Route path="/reservations/me" element={<ProtectedRoute>
            <MyReservations />
          </ProtectedRoute>} exact />
          {stripeApiKey &&
            <Route path="/reservation" element={
              <Elements stripe={loadStripe(stripeApiKey)}>
                <ProtectedRoute>
                  <Reservation />
                </ProtectedRoute>
              </Elements>} exact />
          }
          <Route path="/dashboard" element={<ProtectedRoute roles={["admin", "owner"]}>
            <Dashboard />
          </ProtectedRoute>} exact />
          <Route path="/admin/owners" element={<ProtectedRoute roles={["admin"]}>
            <OwnersList />
          </ProtectedRoute>} exact />
          <Route path="/admin/owner" element={<ProtectedRoute roles={["admin"]}>
            <NewOwner />
          </ProtectedRoute>} exact />
          <Route path="/admin/blog" element={<ProtectedRoute roles={["admin"]}>
            <BlogAdmin />
          </ProtectedRoute>} exact />
          <Route path="/admin/post/new" element={<ProtectedRoute roles={["admin"]}>
            <NewPost />
          </ProtectedRoute>} exact />
          <Route path="/admin/post/:id" element={<ProtectedRoute roles={["admin"]}> 
            <UpdatePost />
          </ProtectedRoute>} exact />
          <Route path="/owner/boat" element={<ProtectedRoute roles={["owner"]}>
            <MyBoat />
          </ProtectedRoute>} exact />
          <Route path="/owner/trips" element={<ProtectedRoute roles={["owner"]}>
            <MyTrips />
          </ProtectedRoute>} exact />
          <Route path="/owner/trip/new" element={<ProtectedRoute roles={["owner"]}>
            <NewTrip />
          </ProtectedRoute>} exact />
          <Route path="/owner/trip/:id" element={<ProtectedRoute roles={["owner"]}>
            <UpdateTrip />
          </ProtectedRoute>} exact />
          <Route path="/owner/bookers" element={<ProtectedRoute roles={["owner"]}>
            <MyBookers />
          </ProtectedRoute>} exact />
          <Route path="/owner/booker/new" element={<ProtectedRoute roles={["owner"]}>
            <NewBooker />
          </ProtectedRoute>} exact />
          <Route path="/owner/reservations/:id" element={<ProtectedRoute roles={["owner"]}>
            <TripReservations />
          </ProtectedRoute>} exact />
        </Routes>
        </div>
        <div className=" w-full">
          <Footer />
        </div>
        
      </div>
    </Router>
  );
}

export default App;
