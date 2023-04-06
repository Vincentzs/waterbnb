// import logo from './logo.svg';
import './App.css';
// import Converter from './components/Converter'
// import Status from './components/Status'
import Counter from './components/Counter';
import Calculator from './components/calculator';
// import Players from './components/players';
// import { APIContext, useAPIContext } from './contexts/APIContexts';
// import { useState } from 'react';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Baseball from './pages/Baseball';
import { useNavigate } from 'react-router-dom';
import Layout from './components/Layout';

function App(){
  return <BrowserRouter>
  <Routes>
    <Route path='/' element={<Layout />}>
      <Route index element={<Counter />} />
      <Route path="baseball/:groupID" element={<Baseball />} />
      <Route path="calculator" element={<Calculator />} /> 
    </Route>
  </Routes>
  </BrowserRouter>
}

export default App;
