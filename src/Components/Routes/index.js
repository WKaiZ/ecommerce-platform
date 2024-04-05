import { Routes, Route } from "react-router-dom";
import WebPage from "../../Pages";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<WebPage />}></Route>
    </Routes>
  );
}
export default AppRoutes;
