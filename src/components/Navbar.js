import { getCartItems } from "../localStorage";

const Navbar = {
  render: () => {
    return `
    <div class="container">
          <div>
            <a href="/#/"><img src="images/header/logo.svg" alt="logo" /></a>
          </div>
          <div class="search-bar">
            <button type="button" class="search-bar__close--btn">
              <img src="images/header/search-icon-small.svg" alt="search-icon-small"/>
            </button>
            <input  type="search" class="search-bar__input" name="search" placeholder="What are you looking for?" />
          </div>
          <div class="header__icons">
            <ul class="icons-list">
              <li class="icon mobile-sarch">
              <input  type="search" class="search-bar__mobile--input" name="search" placeholder="What are you looking for?" />
                  <button href="#" class="icon-link search-icon">
                      <img src="images/header/search-icon.svg" alt="search-icon" />
                    </button>
              </li>
              <li class="icon">
              <a href="/#/signin" class="icon-link user-icon">
                  <img src="images/header/user-icon.svg" alt="user" />
                </a>
              </li>
              <li class="icon">
                <a href="/#/favorite" class="icon-link favorite-icon">
                  <img src="images/header/heart-icon.svg" alt="heart" />
                </a>
              </li>
              <li class="icon">
                <a href="/#/cart" class="icon-link cart-icon">
                  <img src="images/header/cart-icon.svg" alt="cart" />
                  <span class="cart-icon__number">0</span>
                </a>
              </li>
              <li class="icon">
                <button class="icon-link menu-icon">
                  <img src="images/header/menu-icon.svg" alt="menu" />
                </button>
              </li>
            </ul>
          </div>
        </div>
    `;
  },
  after_render: () => {
    // Mobile search bar
    const searchIcon = document.querySelector(".search-icon");
    searchIcon.addEventListener("click", function () {
      document
        .querySelector(".search-bar__mobile--input")
        .classList.toggle("active");
      this.classList.toggle("active");
    });
    // Cart icon
    const cartIcon = document.querySelector(".cart-icon__number");
    let cartItems = getCartItems();
    cartIcon.innerHTML = `${cartItems.reduce((a, c) => a + c.qty, 0)}`;
    if (getCartItems().length === 0) {
      cartIcon.style.display = "none";
    }
  },
};

export default Navbar;
