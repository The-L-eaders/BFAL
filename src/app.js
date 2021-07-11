import React from "react";
import Main from "./Main";
import Header from "./components/Header";
import GlobalState from "./contaxt/GlobalState";

export default function App() {
  return (
    <main>
      <GlobalState.Provider>
        <Header />
        <Main />
      </GlobalState.Provider>
    </main>
  );
}