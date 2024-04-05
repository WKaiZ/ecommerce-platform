import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import AppFooter from "./Components/Footer";
import AppHeader from "./Components/Header";
import PageContent from "./Components/PageContent";


function App() {
  global.cartItems = [];
  global.searchQuery = "";
  return (
    <div className="App">
      <Router>
        <AppHeader />
        <PageContent />
        <AppFooter />
      </Router>
    </div>
  );
}
export default App;
