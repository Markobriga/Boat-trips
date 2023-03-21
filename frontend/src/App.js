import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

import './App.css';
import Header from './modules/Header';
import Footer from './modules/Footer';
import Home from './pages/Home'

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" Component={Home} exact />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
