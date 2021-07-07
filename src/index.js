import ReactDOM from "react-dom";
import App from "./app";
import SettingsProvider from './contaxt/biddingContext'

const MyApp = () => {
  return (
    <>
    <SettingsProvider>
      <App />
      </SettingsProvider>
    </>
  );
};

ReactDOM.render(<MyApp />, document.getElementById("root"));
