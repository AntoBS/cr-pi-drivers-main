import './App.css'
import { Route, Routes, useLocation } from "react-router-dom";
import NavBar from './Components/NavBar/NavBAr';
import { Landing, Home, Detail, Form } from './views/index';

function App() {
  
  const location = useLocation();
  console.log("Ruta actual:", location.pathname);

  return (
    <div className="App">
      {location.pathname !== "/" && <NavBar />}
      <Routes>
      <Route path="/" element={<Landing />}></Route>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/form" element={<Form />}></Route>
        <Route path="/detail/:id" element={<Detail />}></Route> 
      </Routes>
    </div>
  );
}

export default App
