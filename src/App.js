import React from "react";
import logo from "./logo.svg";
import "./App.css";
import AutoComplete from "./components/AutoComplete";
import AutoComplete1 from "./components/AutoComplete1";

function App() {
  let countries = [
    "India",
    "England",
    "Australia",
    "US",
    "SA",
    "Canada",
    "Indonasia",
    "China",
    "Ireland",
    "Iran"
  ];
  return (
    <div className="App">
      <AutoComplete
        countries={countries}
      />
    </div>
  );
}

export default App;
