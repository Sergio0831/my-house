import { signin } from "../api";
import { getUserInfo, setUserInfo } from "../localStorage";

const SignInScreen = {
  after_render: () => {
    const signinForm = document.getElementById("signin-form");
    signinForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const data = await signin({
        email: document.getElementById("email").value,
        password: document.getElementById("password").value,
      });
      if (data.error) {
        alert(data.error);
      } else {
        setUserInfo(data);
        document.location.hash = "/";
      }
    });
  },
  render: () => {
    if (getUserInfo().name) {
      document.location.hash = "/";
    }
    return `
    <div class="form-container">
      <form class="signin-form" id="signin-form">
        <ul class="signin-form__items">
          <li>
            <h1 class="signin-form__title">Login</h1>
          </li>
          <li>
            <input class="signin-form__input" type="email" id="email" name="email" placeholder="Email" />
          </li>
          <li>
            <input class="signin-form__input" type="password" id="password" name="password" placeholder="Password" />
          </li>
          <li>
            <button type="submit" class="btn signin-form__btn">Login</button>
          </li>
          <li>
            <div class="signin-form__text">
            New User?
             <a class="signin-form__link" href="/#/register">Create your account</a>
            </div>
          </li>
        </ul>
      </form>
    </div>
    `;
  },
};

export default SignInScreen;
