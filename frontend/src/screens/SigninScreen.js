import { signin } from "../api";
import { getUserInfo, setUserInfo } from "../localStorage";
import { showLoading, hideLoading, showMessage, redirectUser } from "../utils";

const SignInScreen = {
  after_render: () => {
    const signinForm = document.getElementById("signin-form");
    signinForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      showLoading();
      const data = await signin({
        email: document.getElementById("email").value,
        password: document.getElementById("password").value,
      });
      hideLoading();
      if (data.error) {
        showMessage(data.error);
      } else {
        setUserInfo(data);
        redirectUser();
      }
    });
  },
  render: () => {
    if (getUserInfo().name) {
      redirectUser();
    }
    return `
    <div class="form-container signin">
      <form class="form" id="signin-form">
        <ul class="form__items">
          <li>
            <h1 class="form__title">Login</h1>
          </li>
          <li>
            <input class="form__input" type="email" id="email" name="email" placeholder="Email" />
          </li>
          <li>
            <input class="form__input" type="password" id="password" name="password" placeholder="Password" />
          </li>
          <li>
            <button type="submit" class="btn form__btn">Login</button>
          </li>
          <li>
            <div class="form__text">
            New User?
             <a class="form__link" href="/#/register">Create your account</a>
            </div>
          </li>
        </ul>
      </form>
    </div>
    `;
  },
};

export default SignInScreen;
