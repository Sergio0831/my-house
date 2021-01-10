import { update } from "../api";
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
  render: () => {
    const { name, email } = getUserInfo();
    if (!name) {
      document.location.hash = "/";
    }
    return `
    <div class="form-container profile">
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
    `;
  },
};

export default ProfileScreen;
