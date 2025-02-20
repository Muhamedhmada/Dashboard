import "./Assets/Variable.css";
import "./App.css";
import './responsive/Responisve.css'
import '../src/Assets/Universe.css'
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import Navbar from "./Components/Navbar/Navbar";
import Banner from "./Pages/Banner/Banner";
import ProductsCategories from "./Pages/ProductsCategories/ProductsCategories";
import Product from "./Pages/Product/Product";
import Contact from "./Pages/Contact/Contact";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import Orders from "./Pages/Orders/Orders";
import Users from "./Pages/Users/Users";
import WebsiteHeader from "./Pages/WebsiteHeader/WebsiteHeader";
import Footer from "./Pages/Footer/Footer";

function App() {
  const {i18n} = useTranslation();

  useEffect(() => {
    const htmlElement = document.documentElement;
    if (i18n.language === "ar") {
      htmlElement.setAttribute("dir", "rtl"); // Set RTL for Arabic
    } else {
      htmlElement.setAttribute("dir", "ltr"); // Set LTR for other languages
    }
  }, [i18n.language]);
  return (
    <div className="App">
      <header className="App-header">

      <Router>
          <Routes>
          <Route path='' element={<Login />} />
          {/* {token ? <Route path='/user' el ement={<Home />} /> : Navigate("./")} */}
            <Route path="/home" element={
            <Home />
            } />
            <Route path="/banner" element={
            <Navbar contentComponent = {Banner}/>
            } />
            <Route path="/productsCategories" element={
            <Navbar contentComponent = {ProductsCategories}/>
            } />
             <Route path="/contact" element={
            <Navbar contentComponent = {Contact}/>
            } />
             <Route path="/Product" element={
            <Navbar contentComponent = {Product}/>
            } />
            <Route path="/user" element={
            <Navbar contentComponent = {Users}/>
            } />
             <Route path="/orders" element={
            <Navbar contentComponent = {Orders}/>
            } />
            <Route path="/website_header" element={
            <Navbar contentComponent = {WebsiteHeader}/>
            } />
             <Route path="/footer" element={
            <Navbar contentComponent = {Footer}/>
            } />
          </Routes>
        </Router>
      </header>
    </div>
  );
}

export default App;


