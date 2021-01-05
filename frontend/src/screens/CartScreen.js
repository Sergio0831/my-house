import { getProduct } from "../api";
import { getCartItems, setCartItems } from "../localStorage";
import { parseRequestUrl } from "../utils";

const addToCart = (item, forceUpdate = false) => {
  let cartItems = getCartItems();
  const existItem = cartItems.find((x) => x.product === item.product);
  if (existItem) {
    cartItems = cartItems.map((x) =>
      x.product === existItem.product ? item : x
    );
  } else {
    cartItems = [...cartItems, item];
  }
  setCartItems(cartItems);
};

const CartScreen = {
  after_render: () => {},
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
            ? `<div class="cart__message"><a href="/#/">Go Shopping</a></div>`
            : cartItems
                .map(
                  (item) => `
            <li class="cart__list-item">
              <div class="cart__image">
                <img src="${item.image}" alt="${item.name}"/>
              </div>
              <div class="cart__name">
                <a class="cart__name-title" href="${`/#/product/${item.product}`}">${
                    item.name
                  }</a>
                <p class="cart__name-price">&euro;${item.price}</p>
                <button id="${
                  item.product
                }" type="button" class="cart__name-remove">remove</button>
              </div>
              <div class="cart__amount">
                <svg class="chevron-up" id=${
                  item.product
                } width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0)">
                <path d="M7.50273 7.19173L12.1848 11.8736C12.4225 12.1115 12.7132 12.2302 13.0568 12.2302C13.4004 12.2302 13.6909 12.1115 13.9286 11.8736L14.6512 11.1512C14.8888 10.9137 15.0076 10.623 15.0076 10.2795C15.0076 9.93599 14.8888 9.64542 14.6512 9.40753L8.37952 3.12629C8.14186 2.8886 7.85123 2.76976 7.50755 2.76976C7.16388 2.76976 6.87348 2.88857 6.63572 3.12629L0.364035 9.4075C0.12638 9.64539 0.00756931 9.93592 0.00756931 10.2795C0.00756931 10.623 0.12638 10.9137 0.364035 11.1512L1.08655 11.8736C1.32407 12.1115 1.61308 12.2302 1.95365 12.2302C2.29396 12.2302 2.58621 12.1115 2.83024 11.8736L7.50273 7.19173Z" fill="#EA4F3D"/>
                </g>
                <defs>
                <clipPath id="clip0">
                <rect width="15" height="15" fill="white" transform="translate(15.0076) rotate(90)"/>
                </clipPath>
                </defs>
                </svg>
              <p class="product-amount">1</p>
                <svg class="chevron-down" id=${
                  item.product
                } width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0)">
                <path d="M7.51241 7.80827L2.83031 3.12636C2.59265 2.88847 2.30199 2.7698 1.95834 2.7698C1.61473 2.7698 1.3242 2.88851 1.08658 3.12636L0.363933 3.84878C0.126379 4.0863 0.00756836 4.377 0.00756836 4.72051C0.00756836 5.06401 0.126379 5.35458 0.363933 5.59247L6.63562 11.8737C6.87328 12.1114 7.16391 12.2302 7.50759 12.2302C7.85126 12.2302 8.14166 12.1114 8.37941 11.8737L14.6511 5.5925C14.8888 5.35461 15.0076 5.06408 15.0076 4.72054C15.0076 4.377 14.8888 4.08633 14.6511 3.84881L13.9286 3.1264C13.6911 2.88851 13.4021 2.76983 13.0615 2.76983C12.7212 2.76983 12.4289 2.88854 12.1849 3.1264L7.51241 7.80827Z" fill="#EA4F3D"/>
                </g>
                <defs>
                <clipPath id="clip0">
                <rect width="15" height="15" fill="white" transform="translate(0.00756836 15) rotate(-90)"/>
                </clipPath>
                </defs>
                </svg>

              </div>
            </li>
            `
                )
                .join("")
        } 
      </ul>
    </div>
    `;
  },
};

export default CartScreen;
