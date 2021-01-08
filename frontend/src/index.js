import "./styles/styles.scss";
import Error404Screen from "./screens/Error404Screen";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import { hideLoading, parseRequestUrl, showLoading } from "./utils";
import CartScreen from "./screens/CartScreen";
import SignInScreen from "./screens/SigninScreen";
import Navbar from "./components/Navbar";
import RegisterScreen from "./screens/RegisterScreen";

if (module.hot) {
  module.hot.accept();
}

const routes = {
  "/": HomeScreen,
  "/product/:id": ProductScreen,
  "/cart/:id": CartScreen,
  "/cart": CartScreen,
  "/signin": SignInScreen,
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
  const main = document.getElementById("main-container");
  main.innerHTML = await screen.render();
  await screen.after_render();
  hideLoading();
};
window.addEventListener("load", router);
window.addEventListener("hashchange", router);
