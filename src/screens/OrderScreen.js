import { deliverOrder, getOrder } from "../api";
import {
  hideLoading,
  parseRequestUrl,
  showLoading,
  showMessage,
  rerender,
} from "../utils";

const OrderScreen = {
  after_render: () => {
    const request = parseRequestUrl();
    document
      .getElementById("deliver-order-button")
      .addEventListener("click", async () => {
        showLoading();
        await deliverOrder(request.id);
        hideLoading();
        showMessage("Order Delivered");
        rerender(OrderScreen);
      });
  },
  render: async () => {
    const request = parseRequestUrl();
    const {
      _id,
      shipping,
      payment,
      orderItems,
      itemsPrice,
      shippingPrice,
      taxPrice,
      totalPrice,
      isDelivered,
      deliveredAt,
      isPaid,
      paidAt,
    } = await getOrder(request.id);
    if (!isPaid) {
      addPaypalSdk();
    }
    return `
    <h1 class="order-id">Order: ${_id}</h1>
      <div class="order">
        <div class="order__info">
          <div class="order__info-item">
              <h2 class="order__title">Shipping:</h2>
              <p class="order__info-info">
              ${shipping.address}, ${shipping.city},
              ${shipping.postalCode}, ${shipping.country}
            </p>
            ${
              isDelivered
                ? `<div class="success">Delivered at ${deliveredAt}</div>`
                : `<div class="error">Not Delivered</div>`
            }
          </div>
          <div class="order__info-item">
              <h2 class="order__title">Payment:</h2>
              <p class=" order__info-info">
              Payment Method: ${payment.paymentMethod}
            </p>
            ${
              isPaid
                ? `<div class="success">Paid at ${paidAt}</div>`
                : `<div class="error">Not Paid</div>`
            }
          </div>
          <div class="order__info-item">
            <ul class="order__list">
              <li class="order__list-item">
                <h2 class="order__title">Shopping Cart:</h2>
                <p class="order__info-info"><strong>Price:</strong></p>
              </li>
              ${orderItems
                .map(
                  (item) => `
              <li class="cart__list-item">
                <div class="cart__image">
                  <img src="${item.image}" alt="${item.name}"/>
                </div>
                <div class="order__list-item__name">
                  <a class="order__list-item__link" href="/#/product/${item.product}">${item.name}</a>
                  <p class="order__list-item__qty"> Qty: ${item.qty}</p>
                </div>
                <div class="cart__name-price order__list-item__price">&euro;${item.price}</div>
              </li>
              `
                )
                .join("\n")}
            </ul>
          </div>
      </div>
      <div class="order__action">
              <ul class="order__action-list">
                  <li class="order__action-list__item">
                    <h2 class="order__title">Order Summary:</h2>
                  </li>
                  <li class="order__action-list__item">
                    <h3>Items:</h3>
                    <p>&euro;${itemsPrice}</p>
                  </li>
                  <li class="order__action-list__item">
                    <h3>Shipping:</h3>
                    <p>&euro;${shippingPrice}</p>
                  </li>
                  <li class="order__action-list__item">
                    <h3>Tax:</h3>
                    <p>&euro;${taxPrice}</p>
                  </li>
                  <li class="order__action-list__item order__total">
                    <h3>Order Total:</h3>
                    <p>&euro;${totalPrice}</p>
                  </li>
                  <li>
                   <div id="#paypal-button"></div>
                  </li>
                  <li>
                  ${
                    isPaid && !isDelivered && isAdmin
                      ? `<button id="deliver-order-button" class="btn btn--add btn--yellow">Deliver Order</button>`
                      : ""
                  }
                  </li>
              </ul>
      </div>
    </div>`;
  },
};

export default OrderScreen;
