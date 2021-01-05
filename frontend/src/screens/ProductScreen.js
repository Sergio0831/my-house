import { getProduct } from "../api";
import { parseRequestUrl } from "../utils";

const ProductScreen = {
  after_render: () => {
    const request = parseRequestUrl();
    document.getElementById("add-button").addEventListener("click", () => {
      document.location.hash = `/cart/${request.id}`;
    });
  },
  displayBlock: (ul) => {
    return (ul.style.display = "block");
  },
  render: async () => {
    const request = parseRequestUrl();
    const product = await getProduct(request.id);
    if (product.error) {
      return `<div>${product.error}</div>`;
    }
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
              <svg class="amount-minus" data-id=${product.id} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.58884 10.0065L15.8314 3.76365C16.1486 3.44678 16.3068 3.05922 16.3068 2.60103C16.3068 2.14289 16.1485 1.75551 15.8314 1.43868L14.8682 0.475152C14.5515 0.158414 14.1639 0 13.7059 0C13.2478 0 12.8604 0.158414 12.5432 0.475152L4.16825 8.8374C3.85133 9.15428 3.69287 9.54179 3.69287 10C3.69287 10.4583 3.85129 10.8455 4.16825 11.1625L12.5432 19.5247C12.8604 19.8416 13.2478 20 13.7058 20C14.1639 20 14.5514 19.8416 14.8681 19.5247L15.8313 18.5614C16.1485 18.2447 16.3068 17.8593 16.3068 17.4052C16.3068 16.9515 16.1485 16.5618 15.8313 16.2364L9.58884 10.0065Z" fill="#EA4F3D"/>
              </svg>
              <p class="product-amount">1</p>
              <svg class="amount-minus" data-id=${product.id} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10.4112 9.99354L4.16863 16.2363C3.85144 16.5532 3.69321 16.9408 3.69321 17.399C3.69321 17.8571 3.85148 18.2445 4.16863 18.5613L5.13184 19.5248C5.44854 19.8416 5.83614 20 6.29415 20C6.75216 20 7.13958 19.8416 7.45677 19.5248L15.8318 11.1626C16.1487 10.8457 16.3071 10.4582 16.3071 9.99998C16.3071 9.54174 16.1487 9.15455 15.8318 8.83754L7.45681 0.475288C7.13962 0.158415 6.75225 0 6.29419 0C5.83614 0 5.44858 0.158415 5.13189 0.475288L4.16867 1.43864C3.85148 1.75533 3.69325 2.14068 3.69325 2.59478C3.69325 3.04852 3.85153 3.43819 4.16867 3.76356L10.4112 9.99354Z" fill="#EA4F3D"/>
              </svg>
            </li>
            <li class="details__info-addBtn">
              <button type="button" id="add-button" class="btn btn--add">Add to shopping bag</button>
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
