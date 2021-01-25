import { getProducts } from "../api";
import Header from "../components/Header";
import Info from "../components/Info";
import Categories from "../components/Categories";
import { getCartItems } from "../localStorage";
import { hideLoading, rerender, showLoading, showMessage } from "../utils";
import { addToCart, cartItemsTotal } from "./CartScreen";

const HomeScreen = {
  after_render: () => {
    // Add product to shopping bag
    const cartBtn = document.querySelectorAll(".cart-button");
    cartBtn.forEach((btn) => {
      let id = btn.id;
      let inCart = getCartItems().find((item) => item.product === id);
      if (inCart) {
        btn.innerText = "In Cart";
        btn.disabled = true;
      } else {
        btn.addEventListener("click", async (e) => {
          const id = e.target.parentElement.id;
          showLoading();
          const products = await getProducts();
          const product = products
            .map((product) => product)
            .find((product) => product.id === id);
          let item = {
            product: product.id,
            name: product.title,
            image: product.image,
            price: Number(product.price),
            countInStok: Number(product.countInStok),
          };
          addToCart({ ...item, qty: 1 });
          cartItemsTotal();
          showMessage(`${product.title} added to shopping bag`, () => {
            rerender(HomeScreen);
          });
          hideLoading();
        });
      }
    });
  },
  render: async () => {
    const product = await getProducts();
    const products = product.slice(0, 8);
    const popularProducts = product.slice(9, 14);
    return `
      ${Header.render()}
    <section id="our-products" class="our-products">
      <div class="container">
            <h2 class="section-title">Our Products</h2>
            <div class="products-filter">
              <button type="button" class="products-filter__btn active">
                All
              </button>
              <button type="button" class="products-filter__btn">
                Living Room
              </button>
              <button type="button" class="products-filter__btn">
                Bedroom
              </button>
              <button type="button" class="products-filter__btn">
                Kitchen
              </button>
              <button type="button" class="products-filter__btn">
                Baby Room
              </button>
            </div>
          <ul class="products">
            ${products
              .map(
                (product) => `
            <li>
              <div class="product" id="${product.id}" data-countInStock="${product.countInStock}">
                <div class="img-container">
                  <a href="/#/product/${product.id}">
                    <img
                      class="product__img"
                      src="${product.image}"
                      alt="${product.name}"
                    />
                  </a>
                  <div class="product__icons">
                    <div class="view-button">
                      <a href="/#/product/${product.id}">
                        <img src="images/visibility.svg" alt="view"/>
                      </a>
                    </div>
                    <button class="cart-button" id="${product.id}">
                      <img src="images/cart-icon.svg" class="cart-button__icon" alt="cart"/>
                    </button>
                    <button class="favorite-button">
                      <img src="images/heart-icon.svg" alt="heart"/>
                    </button>
                  </div>
                </div>
                <div class="product__name">
                  <a href="/#/product/${product.id}">${product.title}</a>
                </div>
                <div class="product__price">&euro; ${product.price}</div>
              </div>
            </li>
              `
              )
              .join("\n")}
          </ul>
          <div class="btn-wrapper">
              <button class="our-products__btn btn">Shop All</button>
          </div>
      </div>
    </section>
    ${Info.render()}
    ${Categories.render()}
    <section id='popular-products' class='popular-products'>
      <div class="container">
          <h2 class='section-title'>Popular Products</h2>
          <ul class="products">
                ${popularProducts
                  .map(
                    (product) => `
            <li>
              <div class="product" id="${product.id}" data-countInStock="${product.countInStock}">
                <div class="img-container">
                  <a href="/#/product/${product.id}">
                    <img
                      class="product__img"
                      src="${product.image}"
                      alt="${product.name}"
                    />
                  </a>
                  <div class="product__icons">
                    <div class="view-button">
                      <a href="/#/product/${product.id}">
                        <img src="images/visibility.svg" alt="view"/>
                      </a>
                    </div>
                    <button class="cart-button" id="${product.id}">
                      <img src="images/cart-icon.svg" class="cart-button__icon" alt="cart"/>
                    </button>
                    <button class="favorite-button">
                      <img src="images/heart-icon.svg" alt="heart"/>
                    </button>
                  </div>
                </div>
                <div class="product__name">
                  <a href="/#/product/${product.id}">${product.title}</a>
                </div>
                <div class="product__price">&euro; ${product.price}</div>
              </div>
            </li>
                  `
                  )
                  .join("\n")}
          </ul>
      </div>
    </section>
    `;
  },
};
export default HomeScreen;
