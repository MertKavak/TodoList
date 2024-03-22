import { Route, Routes } from "react-router-dom";
import Card from "./components/Card";
import Home from "./page/Home";
import TodoDetail from "./page/TodoDetail";
import Headerr from "./components/Headerr";

function App() {
  return (
    <div className="app">
      <Headerr></Headerr>
      <Routes>
        <Route path="/card" element={<Card />} />
        <Route path="/" element={<Home />} />
        <Route path="/todoDetail/:id" element={<TodoDetail />} />
      </Routes>
      
    </div>
  );
}

export default App;
