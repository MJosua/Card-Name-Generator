//import css
import "bootstrap/dist/css/bootstrap.css";
import './App.css';

//import library
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter as Router, Routes, Route, useParams  } from "react-router-dom";
import FrontPage from "./Pages/FrontPage";
import Card from "./Pages/Card";
import Login from "./Pages/Login";
//import pages


function App() {
  return (
    <ChakraProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/create" element={<FrontPage />} />
          <Route path="/card" element={<Card />} />
        </Routes>
      </Router>
    </ChakraProvider>
  );
}

export default App;
