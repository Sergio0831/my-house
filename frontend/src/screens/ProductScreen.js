import { getProduct } from "../api";
import { parseRequestUrl } from "../utils";

const ProductScreen = {
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
      </div>
    </div>
    `;
  },
};
export default ProductScreen;
