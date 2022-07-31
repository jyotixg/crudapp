import { ToastContainer } from 'react-toastify';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  BrowserRouter
} from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import Home from './components/Home';
import AddEdit from './components/AddEdit';
import View from './components/View';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <ToastContainer position="top-center" />
        <Routes>
          <Route exact path ="/" element={<Home />} /> 
          <Route path ="/addProduct" element={<AddEdit />} /> 
          <Route path ="/update/:id" element={<AddEdit />} /> 
          <Route path ="/view/:id" element={<View />} /> 
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
