const CheckoutSteps = {
  render: (props) => {
    return `
    <div class="checkout-steps">
      <div class='${props.step1 ? "active" : ""}'><p>Login</p></div>
      <div class='${props.step2 ? "active" : ""}'><p>Shipping</p></div>
      <div class='${props.step3 ? "active" : ""}'><p>Payment</p></div>
      <div class='${props.step4 ? "active" : ""}'><p>Place Order</p></div>
    </div>
    `;
  },
};

export default CheckoutSteps;
