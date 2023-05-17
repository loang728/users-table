
import './App.css';
import { useState, useEffect } from 'react';
import Setup from './Setup.js'
import Table from './Table.js';
import RowsFromJson from './MOCK_DATA.json';

import { Route, Routes } from 'react-router-dom';

function App() {
  const [title, setTitle] = useState("Project Access");
  const [idRow, setIdRow] = useState(0);

  function handleId( id) {
    setIdRow(id)
 }

  return (
    <div className="App">
      <header><h1>{title}</h1><input type="text" id="search" value="Type to filter the table"></input></header>
      <div className="content">
        <Routes>
          <Route path="/" element={<Table content={RowsFromJson} change={handleId}/>}> </Route>
          <Route path="/setup" element={<Setup row={RowsFromJson[idRow]} />} ></Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
