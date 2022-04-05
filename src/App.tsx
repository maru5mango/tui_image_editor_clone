import React from "react";
import "./style/App.css";

function App() {
  return (
    <main>
      <header>
        <div className="logo">MU EDITOR</div>
        <div className="btnDiv">
          <button type="button" className="loadBtn">
            Load
          </button>
          <button type="button" className="downloadBtn">
            Download
          </button>
        </div>
      </header>
      <section className="result">
        <div className="image">
          <img src="../assets/test.jpg" />
        </div>
      </section>
      <section className="menu"></section>
    </main>
  );
}

export default App;
