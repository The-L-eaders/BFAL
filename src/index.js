import ReactDOM from "react-dom";
import App from "./app";
import { BrowserRouter } from "react-router-dom";

import SettingsProvider from "./contaxt/biddingContext";

const MyApp = () => {
  return (
    <>
      <BrowserRouter>
        <SettingsProvider>
            <App />
        </SettingsProvider>{" "}
      </BrowserRouter>
    </>
  );
};

ReactDOM.render(<MyApp />, document.getElementById("root"));
