
import './App.css';

import Footer from './components/layouts/Footer';
import Header from './components/layouts/Header';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from 'react-hot-toast';
import useUserRoute from "./components/routes/UserRoute";
import useAdminRoute from "./components/routes/AdminRoute";


function App() {

  const UserRoute = useUserRoute();
  const AdminRoute = useAdminRoute();
  return (
    <Router>
      <div className="App">
        <Toaster position='top-center' />

        <Header />
        <div className=' container'>
          <Routes>
            {UserRoute}
            {AdminRoute}
          </Routes>
        </div>

        <Footer />

      </div>
    </Router>
  );
}

export default App;
