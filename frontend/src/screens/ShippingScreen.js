import CheckoutSteps from "../components/CheckoutSteps";
import { getShipping, getUserInfo, setShipping } from "../localStorage";

const ShippingScreen = {
  after_render: () => {
    const shippingForm = document.getElementById("shipping-form");
    shippingForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      setShipping({
        address: document.getElementById("address").value,
        city: document.getElementById("city").value,
        postalCode: document.getElementById("postalCode").value,
        country: document.getElementById("country").value,
      });
      document.location.hash = "/payment";
    });
  },
  render: () => {
    const { name } = getUserInfo();
    if (!name) {
      document.location.hash = "/";
    }
    const { address, city, postalCode, country } = getShipping();
    return `
    ${CheckoutSteps.render({ step1: true, step2: true })}
    <div class="form-container shipping">
      <form class="form" id="shipping-form">
        <ul class="form__items">
          <li>
            <h1 class="form__title">Shipping</h1>
          </li>
          <li>
            <input class="form__input" type="text" id="address" name="address" value="${address}" placeholder="Address"/>
          </li>
          <li>
            <input class="form__input" type="text" id="city" name="city" value="${city}" placeholder="City"/>
          </li>
          <li>
            <input class="form__input" type="text" id="postalCode" name="postalCode" value="${postalCode}" placeholder="Postal Code"/>
          </li>
          <li>
            <input class="form__input" type="text" id="country" name="country" value="${country}" placeholder="Country"/>
          </li>
          <li>
            <button type="submit" class="btn form__btn">Continue</button>
          </li>
        </ul>
      </form>
    </div>
    `;
  },
};

export default ShippingScreen;
