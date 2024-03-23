import logo from './logo.svg';
import './App.css';
import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import SaleDeeds from './components/saledeeds/SaleDeeds';

function App() {
  return (
    <BrowserRouter>
    <div className='App'>
      <Routes>
        <Route path= "/saledeeds" element = {<SaleDeeds />} />
      </Routes></div>
      </BrowserRouter>
   
  );
}

export default App;
