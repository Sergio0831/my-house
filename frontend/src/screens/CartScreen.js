import { getProduct } from "../api";
import { getCartItems, setCartItems } from "../localStorage";
import { parseRequestUrl, rerender, showMessage } from "../utils";

export const addToCart = (item, forceUpdate = false) => {
  let cartItems = getCartItems();
  const existItem = cartItems.find((x) => x.product === item.product);
  if (existItem) {
    if (forceUpdate) {
      cartItems = cartItems.map((x) =>
        x.product === existItem.product ? item : x
      );
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
  setCartItems(getCartItems().filter((x) => x.product !== id));
  if (id === parseRequestUrl().id) {
    document.location.hash = "/cart";
  } else {
    rerender(CartScreen);
  }
};

const cartItemsTotal = () => {
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
        const item = getCartItems().find((x) => x.product === qtySelect.id);
        addToCart({ ...item, qty: Number(e.target.value) }, true);
      });
    });
    const removeButtons = document.getElementsByClassName("cart__name-remove");
    Array.from(removeButtons).forEach((removeButton) => {
      removeButton.addEventListener("click", (e) => {
        const title =
          e.target.parentElement.previousElementSibling.children[0].innerHTML;
        const message = `${title}  was removed from your shopping bag`;
        console.log(title);
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
      const product = await getProduct(request.id);
      addToCart({
        product: product._id,
        name: product.name,
        image: product.image,
        price: product.price,
        countInStock: product.countInStock,
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
                <a class="cart__name-title" href="/#/product/${item.product}">${
                    item.name
                  }</a>
                <p class="cart__name-price">&euro;${item.price}</p>
                <div class="cart__name-amount">
                  <select class="qty-select" id="${item.product}">
                     ${[...Array(item.countInStock).keys()].map((x) =>
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
              <button id="${
                item.product
              }" type="button" class="cart__name-remove">
                <svg class="delete-icon" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0)">
                <path d="M12.7589 7.24603C12.5002 7.24603 12.2905 7.45571 12.2905 7.71442V16.5669C12.2905 16.8254 12.5002 17.0353 12.7589 17.0353C13.0176 17.0353 13.2273 16.8254 13.2273 16.5669V7.71442C13.2273 7.45571 13.0176 7.24603 12.7589 7.24603Z" fill="#EA4F3D"/>
                <path d="M7.23181 7.24603C6.9731 7.24603 6.76343 7.45571 6.76343 7.71442V16.5669C6.76343 16.8254 6.9731 17.0353 7.23181 17.0353C7.49052 17.0353 7.7002 16.8254 7.7002 16.5669V7.71442C7.7002 7.45571 7.49052 7.24603 7.23181 7.24603Z" fill="#EA4F3D"/>
                <path d="M3.20382 5.95413V17.4941C3.20382 18.1762 3.45393 18.8167 3.89084 19.2763C4.32574 19.7372 4.93098 19.9988 5.56439 19.9999H14.4263C15.0599 19.9988 15.6652 19.7372 16.0999 19.2763C16.5368 18.8167 16.7869 18.1762 16.7869 17.4941V5.95413C17.6554 5.7236 18.2182 4.88453 18.102 3.99333C17.9857 3.1023 17.2266 2.43577 16.3279 2.43559H13.9298V1.85011C13.9325 1.35776 13.7379 0.884987 13.3893 0.537176C13.0408 0.189549 12.5673 -0.00402465 12.0749 5.06441e-07H7.91582C7.42347 -0.00402465 6.94996 0.189549 6.60142 0.537176C6.25288 0.884987 6.05821 1.35776 6.06095 1.85011V2.43559H3.66287C2.76416 2.43577 2.00505 3.1023 1.88869 3.99333C1.77251 4.88453 2.3353 5.7236 3.20382 5.95413V5.95413ZM14.4263 19.0632H5.56439C4.76357 19.0632 4.14058 18.3752 4.14058 17.4941V5.99529H15.8501V17.4941C15.8501 18.3752 15.2272 19.0632 14.4263 19.0632ZM6.99772 1.85011C6.99461 1.60622 7.09048 1.37148 7.26356 1.19932C7.43646 1.02715 7.67175 0.932557 7.91582 0.936765H12.0749C12.319 0.932557 12.5543 1.02715 12.7272 1.19932C12.9003 1.3713 12.9961 1.60622 12.993 1.85011V2.43559H6.99772V1.85011ZM3.66287 3.37235H16.3279C16.7935 3.37235 17.171 3.7498 17.171 4.21544C17.171 4.68108 16.7935 5.05853 16.3279 5.05853H3.66287C3.19723 5.05853 2.81978 4.68108 2.81978 4.21544C2.81978 3.7498 3.19723 3.37235 3.66287 3.37235V3.37235Z" fill="#EA4F3D"/>
                <path d="M9.99523 7.24603C9.73653 7.24603 9.52686 7.45571 9.52686 7.71442V16.5669C9.52686 16.8254 9.73653 17.0353 9.99523 17.0353C10.2539 17.0353 10.4636 16.8254 10.4636 16.5669V7.71442C10.4636 7.45571 10.2539 7.24603 9.99523 7.24603Z" fill="#EA4F3D"/>
                </g>
                <defs>
                <clipPath id="clip0">
                <rect width="20" height="20" fill="white"/>
                </clipPath>
                </defs>
                </svg>

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
