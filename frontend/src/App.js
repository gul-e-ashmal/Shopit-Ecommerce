
import './App.css';
import Home from './components/Home';
import Footer from './components/layouts/Footer';
import Header from './components/layouts/Header';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from 'react-hot-toast';
import ProductDetail from './components/product/ProductDetail';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import UserLayout from './components/layouts/UserLayout';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


function App() {
  return (
    <Router>
      <div className="App">
        <Toaster position='top-center' />

        <Header />
        <div className=' container'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/products/:id' element={<ProductDetail />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/me/profile' element={<UserLayout />} />
          </Routes>
        </div>

        <Footer />

      </div>
    </Router>
  );
}

export default App;
