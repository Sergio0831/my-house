import "./styles/styles.scss";
import Error404Screen from "./screens/Error404Screen";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import { hideLoading, parseRequestUrl, showLoading } from "./utils";
import CartScreen from "./screens/CartScreen";
import SigninScreen from "./screens/SigninScreen";
import Navbar from "./components/Navbar";
import RegisterScreen from "./screens/RegisterScreen";
import Footer from "./components/Footer";
import Menu from "./components/Menu";

if (module.hot) {
  module.hot.accept();
}

const routes = {
  "/": HomeScreen,
  "/product/:id": ProductScreen,
  "/cart/:id": CartScreen,
  "/cart": CartScreen,
  "/signin": SigninScreen,
  "/register": RegisterScreen,
};

const router = async () => {
  showLoading();
  const request = parseRequestUrl();
  const parseUrl =
    (request.resource ? `/${request.resource}` : "/") +
    (request.id ? "/:id" : "") +
    (request.verb ? `/${request.verb}` : "");
  const screen = routes[parseUrl] ? routes[parseUrl] : Error404Screen;
  const navbar = document.getElementById("navbar-container");
  navbar.innerHTML = Navbar.render();
  Navbar.after_render();
  const menu = document.getElementById("menu");
  menu.innerHTML = Menu.render();
  Menu.after_render();
  const main = document.getElementById("main-container");
  main.innerHTML = await screen.render();
  const footer = document.getElementById("footer");
  footer.innerHTML = Footer.render();
  if (screen.after_render) await screen.after_render();
  hideLoading();
};
window.addEventListener("load", router);
window.addEventListener("hashchange", router);
