import "bootstrap-icons/font/bootstrap-icons.css";
import './assets/scss/all.scss';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import DashBoard from './pages/DashBoard';
import { ProductProvider } from "./context/productContext";
function App() {
  return (
    <ProductProvider>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/dashboard' element={<DashBoard/>}/>
      </Routes>
    </ProductProvider>
  )
}

export default App
