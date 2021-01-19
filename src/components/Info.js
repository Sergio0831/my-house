const Info = {
  render: () => {
    return `
    <section id="info" class="info" >
      <div class="container">
        <ul class="info__list">
          <li class="info__item">
            <img class="info__item-icon" src="../images/info/delivery-truck.svg" alt="delivery-truck"/>
            <h3 class="info__item-title">FREE DELIVERY</h3>
            <p class="info__item-text">On selected item anywhere in Ireland</p>
          </li>
          <li class="info__item">
            <img class="info__item-icon" src="../images/info/tap.svg" alt="delivery-truck"/>
            <h3 class="info__item-title">CLICK & COLLECT</h3>
            <p class="info__item-text">Order online and
            collect in store</p>
          </li>
          <li class="info__item">
            <img class="info__item-icon" src="../images/info/buy.svg" alt="delivery-truck"/>
            <h3 class="info__item-title">ORDER ONLINE</h3>
            <p class="info__item-text">Order and pay online
            with secure payment</p>
          </li>
        </ul>
      </div>
    </section>
    `;
  },
};

export default Info;
