import { deleteOrder, getOrders } from "../api";
import DashboardMenu from "../components/DasboardMenu";
import { showLoading, hideLoading, rerender, showMessage } from "../utils";

const OrderListScreen = {
  after_render: () => {
    const deleteButtons = document.querySelectorAll(".btn--delete");
    Array.from(deleteButtons).forEach((deleteButton) => {
      deleteButton.addEventListener("click", async () => {
        if (confirm("Are you sure to delete this order?")) {
          showLoading();
          const data = await deleteOrder(deleteButton.id);
          if (data.error) {
            showMessage(data.error);
          } else {
            rerender(OrderListScreen);
          }
          hideLoading();
        }
      });
    });
  },
  render: async () => {
    const orders = await getOrders();
    return `
    <div class="dashboard">
      ${DashboardMenu.render({ selected: "orders" })}
      <div class="dashboard__content">
        <h1 class="dashboard__title">Orders</h1>
        <div>
          <table class="orders-table">
            <thead>
              <tr>
                <th class="column1">Id</th>
                <th class="column2">Date</th>
                <th class="column3">Total</th>
                <th class="column4">User</th>
                <th class="column5">Paid At</th>
                <th class="column6">Delivered At</th>
                <th class="column7">Action</th>
              </tr>
            </thead>
            <tbody>
              ${orders
                .map(
                  (order) => `
              <tr>
                <td class="column1">${order._id}</td>
                <td class="column2">${order.createdAt}</td>
                <td class="column3">${order.totalPrice}</td>
                <td class="column4">${order.user.name}</td>
                <td class="column5">${order.paidAt || "No"}</td>
                <td class="column5">${order.deliveredAt || "No"}</td>
                <td class="column6">
                  <button id="${
                    order._id
                  }" class="btn btn--edit btn--yellow">Edit</button>
                  <button id="${
                    order._id
                  }" class="btn btn--delete">Delete</button>
                </td>
              </tr>
              `
                )
                .join("\n")}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    `;
  },
};

export default OrderListScreen;
