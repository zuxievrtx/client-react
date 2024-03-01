import { useState } from "react";
import "./App.css";
import Siswa from "./Siswa";

function App() {
  return (
    <div className="fluid-container p-2">
      <div className="row">
        <div className="col-12">
          <h1>Data Siswa</h1>
          <Siswa></Siswa>
        </div>
      </div>
    </div>
  );
}

export default App;
