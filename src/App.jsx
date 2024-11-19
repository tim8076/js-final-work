import "bootstrap-icons/font/bootstrap-icons.css";
import './assets/scss/all.scss';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import DashBoard from './pages/Dashboard';
import { ProductProvider } from "./context/productContext";
import { DashboardProvider } from "./context/dashboardContext";
function App() {
  return (
    <DashboardProvider>
      <ProductProvider>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/dashboard' element={<DashBoard/>}/>
        </Routes>
      </ProductProvider>
    </DashboardProvider>
  )
}

export default App
