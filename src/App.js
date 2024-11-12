import logo from './resources/dev-pfp-512.png';
import Users from './pages/Users'; 
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UpdateForm from './pages/UpdateForm';
import AddForm from './pages/AddForm';
import './App.css';

function App() {
  return (
    <div className="app">
      <div className="app-header">
        <img src={logo} className="app-logo" alt="logo"/>
        <BrowserRouter>
          <Routes>
            <Route path='/add' element={<AddForm/>}/>
            <Route path="/" element={<Users/>}/>
            <Route path='/update/:id' element={<UpdateForm/>}/>
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}




export default App;
