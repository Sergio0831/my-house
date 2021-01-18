const DashboardMenu = {
  render: (props) => {
    return `
    <div class="dashboard__menu">
      <ul class="dashboard__menu-list">
        <li class='dashboard__menu-item ${
          props.selected === "dashboard" ? "selected" : ""
        }'>
          <a href="/#/dashboard" class="dashboard__menu-link dashboard-icon">
            Dashboard
          </a>
        </li>
        <li class='dashboard__menu-item ${
          props.selected === "orders" ? "selected" : ""
        }'>
          <a href="/#/orderlist" class="dashboard__menu-link">
            Orders
          </a>
        </li>
        <li class='dashboard__menu-item ${
          props.selected === "products" ? "selected" : ""
        }'>
          <a href="/#/productlist" class="dashboard__menu-link">
            Products
          </a>
        </li>
      </ul>
    </div>
    `;
  },
};

export default DashboardMenu;
