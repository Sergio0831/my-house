import { getMyOrders, update } from "../api";
import { clearUser, getUserInfo, setUserInfo } from "../localStorage";
import { showLoading, hideLoading, showMessage } from "../utils";

const ProfileScreen = {
  after_render: () => {
    const signOutBtn = document.querySelector(".signout__btn");
    signOutBtn.addEventListener("click", () => {
      clearUser();
      document.location = "/";
    });
    const registerForm = document.getElementById("profile-form");
    registerForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      showLoading();
      const data = await update({
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        password: document.getElementById("password").value,
      });
      hideLoading();
      if (data.error) {
        showMessage(data.error);
      } else {
        setUserInfo(data);
        document.location.hash = "/";
      }
    });
  },
  render: async () => {
    const { name, email } = getUserInfo();
    if (!name) {
      document.location.hash = "/";
    }
    const orders = await getMyOrders();
    return `
    <div class="profile-screen">
      <div class="profile__orders">
        <h2 class="profile__orders-title">Order History</h2>
          <table class="orders__table">
            <thead class="orders__table-header">
              <tr class="orders__table-row">
                <th>ORDER ID</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>PAID</th>
                <th>DELIVERED</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody class="orders__table-body">
              ${
                orders.length === 0
                  ? `<tr class="orders__table-row"><td colspan="6">No Order Found</td></tr>`
                  : orders
                      .map(
                        (order) => `
                  <tr class="orders__table-row">
                    <td>${order._id}</td>
                    <td>${order.createdAt}</td>
                    <td>${order.totalPrice}</td>
                    <td>${order.paidAt || "No"}</td>
                    <td>${order.deliveredAt || "No"}</td>
                    <td><a href="/#/order/${order.id}">DETAILS</a></td>
                  </tr>
                  `
                      )
                      .join("\n")
              }
            </tbody>
          </table>
      </div>
      <div class="profile__info">
        <div class="form-container">
          <form class="form" id="profile-form">
            <ul class="form__items">
              <li>
                <h1 class="form__title">User Profile</h1>
              </li>
              <li>
                <input class="form__input" type="name" id="name" name="name" value="${name}" />
              </li>
              <li>
                <input class="form__input" type="email" id="email" name="email" value="${email}" />
              </li>
              <li>
                <input class="form__input" type="password" id="password" name="password" placeholder="Password" />
              </li>
              <li>
                <button type="submit" class="btn form__btn">Update</button>
              </li>
              <li>
                <button type="submit" class="btn signout__btn">Sign Out</button>
              </li>
            </ul>
          </form>
      </div>
      </div>
    </div>

    
    `;
  },
};

export default ProfileScreen;
