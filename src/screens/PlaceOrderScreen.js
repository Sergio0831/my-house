// import { createOrder } from "../api";
// import CheckoutSteps from "../components/CheckoutSteps";
// import {
//   cleanCart,
//   getCartItems,
//   getPayment,
//   getShipping,
// } from "../localStorage";
// import { showLoading, hideLoading, showMessage } from "../utils";

// const convertCartToOrder = () => {
//   const orderItems = getCartItems();
//   if (orderItems.length === 0) {
//     document.location.hash = "/cart";
//   }
//   const shipping = getShipping();
//   if (!shipping) {
//     document.location.hash = "/cart";
//   }
//   const payment = getPayment();
//   if (!payment.paymentMethod) {
//     document.location.hash = "/payment";
//   }
//   const itemsPrice = orderItems.reduce((a, c) => a + c.price * c.qty, 0);
//   const shippingPrice = itemsPrice > 100 ? 0 : 10;
//   const taxPrice = Math.round(0.15 * itemsPrice * 100) / 100;
//   const totalPrice = itemsPrice + shippingPrice + taxPrice;
//   return {
//     orderItems,
//     shipping,
//     payment,
//     itemsPrice,
//     shippingPrice,
//     taxPrice,
//     totalPrice,
//   };
// };

// const PlaceOrderScreen = {
//   after_render: () => {
//     document
//       .getElementById("placeorder-button")
//       .addEventListener("click", async (e) => {
//         e.preventDefault();
//         const order = convertCartToOrder();
//         showLoading();
//         const data = await createOrder(order);
//         hideLoading();
//         if (data.error) {
//           showMessage(data.error);
//         } else {
//           cleanCart();
//           document.location.hash = `/order/${data.order._id}`;
//         }
//       });
//   },
//   render: () => {
//     const {
//       orderItems,
//       shipping,
//       payment,
//       itemsPrice,
//       shippingPrice,
//       taxPrice,
//       totalPrice,
//     } = convertCartToOrder();
//     return `
//     <div>${CheckoutSteps.render({
//       step1: true,
//       step2: true,
//       step3: true,
//       step4: true,
//     })}
//       <div class="order">
//         <div class="order__info">
//           <div class="order__info-item">
//               <h2 class="order__title">Shipping:</h2>
//               <p class="order__info-info">
//               ${shipping.address}, ${shipping.city},
//               ${shipping.postalCode}, ${shipping.country}
//             </p>
//           </div>
//           <div class="order__info-item">
//               <h2 class="order__title">Payment:</h2>
//               <p class=" order__info-info">
//               Payment Method: ${payment.paymentMethod}
//             </p>
//           </div>
//           <div class="order__info-item">
//             <ul class="order__list">
//               <li class="order__list-item">
//                 <h2 class="order__title">Shopping Cart:</h2>
//                 <p class="order__info-info"><strong>Price:</strong></p>
//               </li>
//               ${orderItems
//                 .map(
//                   (item) => `
//               <li class="cart__list-item">
//                 <div class="cart__image">
//                   <img src="${item.image}" alt="${item.name}"/>
//                 </div>
//                 <div class="order__list-item__name">
//                   <a class="order__list-item__link" href="/#/product/${item.product}">${item.name}</a>
//                   <p class="order__list-item__qty"> Qty: ${item.qty}</p>
//                 </div>
//                 <div class="cart__name-price order__list-item__price">&euro;${item.price}</div>
//               </li>
//               `
//                 )
//                 .join("\n")}
//             </ul>
//           </div>
//       </div>
//       <div class="order__action">
//               <ul class="order__action-list">
//                   <li class="order__action-list__item">
//                     <h2 class="order__title">Order Summary:</h2>
//                   </li>
//                   <li class="order__action-list__item">
//                     <h3>Items:</h3>
//                     <p>&euro;${itemsPrice}</p>
//                   </li>
//                   <li class="order__action-list__item">
//                     <h3>Shipping:</h3>
//                     <p>&euro;${shippingPrice}</p>
//                   </li>
//                   <li class="order__action-list__item">
//                     <h3>Tax:</h3>
//                     <p>&euro;${taxPrice}</p>
//                   </li>
//                   <li class="order__action-list__item order__total">
//                     <h3>Order Total:</h3>
//                     <p>&euro;${totalPrice}</p>
//                   </li>
//                   <li class="order__action-list__item"><button id="placeorder-button" class="order__action-btn btn"  >Place Order</button></li>
//               </ul>
//       </div>
//     </div>`;
//   },
// };

// export default PlaceOrderScreen;
