import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

import './App.css';
import Header from './modules/Header';
import Footer from './modules/Footer';
import Home from './pages/Home'
import Boats from './pages/Boats';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" Component={Home} exact />
          <Route path="/boats" Component={Boats} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
