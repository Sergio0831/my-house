import { getProduct, getProducts } from "../api";
import { getCartItems, setCartItems } from "../localStorage";
import { parseRequestUrl, rerender, showMessage } from "../utils";

export const addToCart = (item, forceUpdate = false) => {
  let cartItems = getCartItems();
  const existItem = cartItems.find((x) => x.id === item.id);
  if (existItem) {
    if (forceUpdate) {
      cartItems = cartItems.map((x) => (x.id === existItem.id ? item : x));
    }
  } else {
    cartItems = [...cartItems, item];
  }
  setCartItems(cartItems);
  if (forceUpdate) {
    rerender(CartScreen);
  }
};

export const removeFromCart = (id) => {
  setCartItems(getCartItems().filter((x) => x.id !== id));
  if (id === parseRequestUrl().id) {
    document.location.hash = "/cart";
  } else {
    rerender(CartScreen);
  }
};

export const cartItemsTotal = () => {
  const navBar = document.getElementById("navbar-container");
  const cartIcon = navBar.querySelector(".cart-icon__number");
  let cartItems = getCartItems();
  cartIcon.innerHTML = `${cartItems.reduce((a, c) => a + c.qty, 0)}`;
  if (getCartItems().length === 0) {
    cartIcon.style.display = "none";
  } else if (getCartItems().length > 0) {
    cartIcon.style.display = "block";
  }
};

const CartScreen = {
  after_render: () => {
    const qtySelects = document.getElementsByClassName("qty-select");
    cartItemsTotal();
    Array.from(qtySelects).forEach((qtySelect) => {
      qtySelect.addEventListener("change", (e) => {
        const item = getCartItems().find((x) => x.id === qtySelect.id);
        addToCart({ ...item, qty: Number(e.target.value) }, true);
      });
    });
    const removeButtons = document.getElementsByClassName("cart__name-remove");
    Array.from(removeButtons).forEach((removeButton) => {
      removeButton.addEventListener("click", (e) => {
        const title =
          e.target.parentElement.previousElementSibling.firstElementChild
            .innerHTML;
        const message = `${title}  was removed from your shopping bag`;
        showMessage(message, removeFromCart(removeButton.id));
      });
    });
    document.getElementById("checkout-button").addEventListener("click", () => {
      document.location.hash = "/signin";
    });
  },
  render: async () => {
    const request = parseRequestUrl();
    if (request.id) {
      const id = await getProduct(request.id);
      const products = await getProducts();
      const product = products
        .map((product) => product)
        .find((product) => product.id);
      addToCart({
        id: product.id,
        name: product.title,
        image: product.image,
        price: product.price,
        countInStok: product.countInStok,
        qty: 1,
      });
    }
    const cartItems = getCartItems();
    return `
    <div class="cart">
      <ul class="cart__list">
        ${
          cartItems.length === 0
            ? `<div class="cart__message"><a href="/">Go Shopping</a></div>`
            : cartItems
                .map(
                  (item) => `
            <li class="cart__list-item">
              <div class="cart__image">
                <img src="${item.image}" alt="${item.name}"/>
              </div>
              <div class="cart__name">
                <a class="cart__name-title" href="/#/product/${item.id}">${
                    item.name
                  }</a>
                <p class="cart__name-price">&euro;${item.price}</p>
                <div class="cart__name-amount">
                  <select class="qty-select" id="${item.id}">
                     ${[...Array(item.countInStok).keys()].map((x) =>
                       item.qty === x + 1
                         ? `<option selected value="${x + 1}">${x + 1}</option>`
                         : `<option  value="${x + 1}">${x + 1}</option>`
                     )}  
                  </select>
                  <svg class="dropdown-chevron" width="10" height="6" viewBox="0 0 9 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1.0285 0.190686C0.801233 -0.0541884 0.423617 -0.0635776 0.18507 0.169715C-0.0534772 0.403008 -0.0626237 0.790639 0.164641 1.03551C0.164641 1.03551 3.72608 4.81432 3.73642 4.82463C3.98252 5.06612 4.37274 5.05709 4.60799 4.80445L8.15833 1.03555C8.38599 0.791064 8.37748 0.403417 8.13931 0.169715C7.90114 -0.063987 7.52351 -0.0552462 7.29585 0.189238L4.52311 3.08265C4.3263 3.28803 3.99804 3.28806 3.80118 3.08273L1.0285 0.190686Z" fill="#111111"/>
                  </svg>
                </div>
              </div>
              <button id="${item.id}" type="button" class="cart__name-remove">
                      <img class="delete-icon" id="${
                        item.id
                      }" src="./images/delete.svg" alt="delete"/>
              </button>
            </li>
            `
                )
                .join("\n")
        } 
      </ul>
      <hr/>
      <div class="cart__total">
        <h2 class="total-text">Total:
        </h2>
        <p class="total-price">&euro;${cartItems.reduce(
          (a, b) => a + b.price * b.qty,
          0
        )}</p>
      </div>
      <div class="cart__checkoutBtn">
              <button type="button" id="checkout-button" class="btn btn--add">Proceed to checkout</button>
      </div>
      <div class="cart__paypalBtn">
            <button type="button" id="checkoutPaypal-btn" class="btn btn--paypal">Pay<span>Pal</span></button> 
      </div>
    </div>
    `;
  },
};

export default CartScreen;
