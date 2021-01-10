import { getProduct } from "../api";
import { getCartItems } from "../localStorage";
import { hideLoading, parseRequestUrl, showLoading } from "../utils";

const ProductScreen = {
  after_render: () => {
    const request = parseRequestUrl();
    document.querySelector(".add-button").addEventListener("click", () => {
      document.location.hash = `/cart/${request.id}`;
    });
  },
  displayBlock: (ul) => {
    return (ul.style.display = "block");
  },
  render: async () => {
    const request = parseRequestUrl();
    showLoading();
    const product = await getProduct(request.id);
    if (product.error) {
      return `<div>${product.error}</div>`;
    }
    hideLoading();
    return `
    <div class="container">
      <div class="breadcrumbs">
          <a class="breadcrumbs__link" href="/#/">Home</a>
          <span class="breadcrumbs__link">${product.name}</span>
        </div>
      <div class="details">
        <div class="details__image">
          <img src="${product.image}" alt="${product.name}"/>
        </div>     
        <div class="details__info">
          <ul class="details-list">
            <li class="details__info-top">
              <h2 class="details__info-title">${product.name}</h2>
              <button class="details__info-favorite">
                <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M23.176 3.62647C21.9429 2.22735 20.2323 1.45684 18.3594 1.45684C15.7252 1.45684 14.0575 3.03008 13.1223 4.34991C12.8797 4.69239 12.6733 5.0358 12.5 5.35894C12.3267 5.0358 12.1204 4.69239 11.8777 4.34991C10.9425 3.03008 9.27481 1.45684 6.64062 1.45684C4.76768 1.45684 3.05708 2.2274 1.82397 3.62652C0.647803 4.96119 0 6.74869 0 8.65972C0 10.7399 0.812158 12.6748 2.55591 14.7486C4.11436 16.6021 6.3564 18.5127 8.95264 20.725C9.92007 21.5494 10.9205 22.402 11.9856 23.3338L12.0176 23.3619C12.1557 23.4828 12.3278 23.5432 12.5 23.5432C12.6722 23.5432 12.8443 23.4827 12.9824 23.3619L13.0144 23.3338C14.0795 22.402 15.0799 21.5495 16.0475 20.7249C18.6436 18.5127 20.8856 16.6022 22.4441 14.7486C24.1878 12.6747 25 10.7399 25 8.65972C25 6.74869 24.3522 4.96119 23.176 3.62647ZM15.0973 19.6101C14.2633 20.3207 13.405 21.0521 12.5 21.8389C11.595 21.0522 10.7367 20.3208 9.90254 19.61C4.82153 15.2802 1.46484 12.4198 1.46484 8.65972C1.46484 7.10552 1.98267 5.66197 2.92295 4.59502C3.87402 3.51597 5.19429 2.92168 6.64062 2.92168C8.64888 2.92168 9.94707 4.15889 10.6824 5.19678C11.342 6.12764 11.6862 7.06602 11.8036 7.42623C11.9018 7.72774 12.1829 7.93179 12.5 7.93179C12.8171 7.93179 13.0982 7.72774 13.1964 7.42623C13.3138 7.06602 13.658 6.12764 14.3176 5.19673C15.0529 4.15889 16.3511 2.92168 18.3594 2.92168C19.8057 2.92168 21.126 3.51597 22.077 4.59502C23.0173 5.66197 23.5352 7.10552 23.5352 8.65972C23.5352 12.4198 20.1785 15.2802 15.0973 19.6101Z" fill="black"/>
                </svg>
              </button>
            </li>
            <li class="details__info-price">
            <p>&euro;${product.price}</p>
            </li>
            <li class="details__info-status">
              ${
                product.countInStock > 0
                  ? `<span class="success">${product.countInStock} in stock</span>`
                  : `<span class="error">out of stock</span>`
              }
            </li>
            <li class="details__info-description">
              <p>${product.description}</p>
            </li>
            ${
              product.countInStock > 0
                ? `
              <li class="details__info-amount">
                <div class="details__info-amount__select">
                  <select class="qty-select" id="${product.id}">
                     ${[...Array(product.countInStock).keys()].map((x) =>
                       product.qty === x + 1
                         ? `<option selected value="${x + 1}">${x + 1}</option>`
                         : `<option  value="${x + 1}">${x + 1}</option>`
                     )}  
                  </select>
                  <svg class="dropdown-chevron" width="10" height="6" viewBox="0 0 9 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1.0285 0.190686C0.801233 -0.0541884 0.423617 -0.0635776 0.18507 0.169715C-0.0534772 0.403008 -0.0626237 0.790639 0.164641 1.03551C0.164641 1.03551 3.72608 4.81432 3.73642 4.82463C3.98252 5.06612 4.37274 5.05709 4.60799 4.80445L8.15833 1.03555C8.38599 0.791064 8.37748 0.403417 8.13931 0.169715C7.90114 -0.063987 7.52351 -0.0552462 7.29585 0.189238L4.52311 3.08265C4.3263 3.28803 3.99804 3.28806 3.80118 3.08273L1.0285 0.190686Z" fill="#111111"/>
                  </svg>
                </div>
              </li>
            <li class="details__info-addBtn">
              <button type="button"  class="btn btn--add add-button">Add to shopping bag</button>
            </li>
            <li class="details__info-paypalBtn">
              <button type="button" class="btn btn--paypal">Pay<span>Pal</span></button>
            </li>
              `
                : ""
            }
          </ul>
        </div>   
      </div>
    </div>
    `;
  },
};
export default ProductScreen;
