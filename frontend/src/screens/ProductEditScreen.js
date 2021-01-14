import { getProduct, updateProduct } from "../api";
import {
  hideLoading,
  parseRequestUrl,
  showLoading,
  showMessage,
} from "../utils";

const ProductEditScreen = {
  after_render: () => {
    const request = parseRequestUrl();
    const editProductForm = document.getElementById("edit-product-form");
    editProductForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      showLoading();
      const data = await updateProduct({
        _id: request.id,
        name: document.getElementById("name").value,
        price: document.getElementById("price").value,
        image: document.getElementById("image").value,
        brand: document.getElementById("brand").value,
        countInStock: document.getElementById("countInStock").value,
        category: document.getElementById("category").value,
        description: document.getElementById("description").value,
      });
      hideLoading();
      if (data.error) {
        showMessage(data.error);
      } else {
        document.location.hash = "/productlist";
      }
    });
  },
  render: async () => {
    const request = parseRequestUrl();
    const product = await getProduct(request.id);
    return `
    <div class="content">
      <a class="content__link" href="/#/productlist"></span>Back to products</a>
      <div class="form-container edit">
        <form class="form" id="edit-product-form">
          <ul class="form__items">
            <li>
              <h1 class="form__title">Edit Product <span>${product._id.substring(
                0,
                8
              )}</span></h1>
            </li>
            <li>
            <label class="form__lable" for="name">Name:</label>
              <input class="form__input" type="text" name="name" value="${
                product.name
              }" id="name" placeholder="Name" />
            </li>
            <li>
            <label class="form__lable" for="price">Price:</label>
              <input class="form__input" type="text" name="price" value="${
                product.price
              }" id="price" />
            </li>
            <li>
            <label class="form__lable" for="image">Image: (680 x 830)</label>
              <input class="form__input" type="text" name="image" value="${
                product.image
              }" id="image" />
            </li>
            <li>
            <label class="form__lable" for="brand">Brand:</label>
              <input class="form__input" type="text" name="brand" value="${
                product.brand
              }" id="brand" />
            </li>
            <li>
            <label class="form__lable" for="countInStock">Count In Stock:</label>
              <input class="form__input" type="text" name="countInStock" value="${
                product.countInStock
              }" id="countInStock" />
            </li>
            <li>
            <label class="form__lable" for="category">Category:</label>
              <input class="form__input" type="text" name="category" value="${
                product.category
              }" id="category" />
            </li>
            <li>
            <label class="form__lable" for="description">Description:</label>
              <input class="form__input" type="text" name="description" value="${
                product.description
              }" id="description" />
            </li>
            <li>
              <button type="submit" class="btn btn--blue form__btn">Update</button>
            </li>
          </ul>
        </form>
      </div>
    </div>
    `;
  },
};

export default ProductEditScreen;
