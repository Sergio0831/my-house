import { getCartItems, getUserInfo } from "../localStorage";

const Navbar = {
  render: () => {
    const { name, isAdmin } = getUserInfo();
    return `
    <div class="container">
          <div>
            <a href="/#/"><img src="./images/header/logo.svg" alt="logo" /></a>
          </div>
          <div class="header__icons">
            <ul class="icons-list">
              <li class="icon">
              ${
                name
                  ? `<a class="user-name" href="/#/profile">${name}</a>`
                  : `
              <a href="/#/signin" class="icon-link user-icon">
                  <img src="./images/header/user-icon.svg" alt="user" />
                </a>
              `
              }
              </li>
              <li class="icon">
                ${
                  isAdmin
                    ? `<a href="/#/dashboard" class="icon-link dashboard-link">Dashboard</a>`
                    : ""
                }
              </li>
              <li class="icon">
                <a href="/#/favorite" class="icon-link favorite-icon">
                  <img src="./images/header/heart-icon.svg" alt="heart" />
                </a>
              </li>
              <li class="icon">
                <a href="/#/cart" class="icon-link cart-icon">
                  <img src="./images/header/cart-icon.svg" alt="cart" />
                  <span class="cart-icon__number">0</span>
                </a>
              </li>
              <li class="icon">
                <a href="#" class="icon-link menu-icon">
                  <img src="./images/header/menu-icon.svg" alt="menu" />
                </a>
              </li>
            </ul>
          </div>
        </div>
    `;
  },
  after_render: () => {
    const cartIcon = document.querySelector(".cart-icon__number");
    let cartItems = getCartItems();
    cartIcon.innerHTML = `${cartItems.reduce((a, c) => a + c.qty, 0)}`;
    if (getCartItems().length === 0) {
      cartIcon.style.display = "none";
    }
  },
};

export default Navbar;
