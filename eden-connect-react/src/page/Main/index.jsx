import "./index.css";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { Outlet } from "react-router-dom";
// import Home from "../Home";

function Main() {
  return (
    <div>
      {/* Header */}
      <Header></Header>
      <Outlet />
      {/* Footer */}
      <Footer></Footer>
    </div>
  );
}

export default Main;
