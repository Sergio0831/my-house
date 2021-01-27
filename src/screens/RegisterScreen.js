import { showLoading, hideLoading, showMessage, redirectUser } from "../utils";

const RegisterScreen = {
  after_render: () => {
    const registerForm = document.getElementById("register-form");
    registerForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      showLoading();
      const data = await register({
        name: document.getElementById("name").value,
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
    return `
    <div class="form-container register">
      <form class="form" id="register-form">
        <ul class="form__items">
          <li>
            <h1 class="form__title">Create Account</h1>
          </li>
          <li>
            <input class="form__input" type="name" id="name" name="name" placeholder="Name" />
          </li>
          <li>
            <input class="form__input" type="email" id="email" name="email" placeholder="Email" />
          </li>
          <li>
            <input class="form__input" type="password" id="password" name="password" placeholder="Password" />
          </li>
          <li>
            <input class="form__input" type="password" id="repassword" name="repassword" placeholder="Re-Enter Password" />
          </li>
          <li>
            <button type="submit" class="btn form__btn">Login</button>
          </li>
          <li>
            <div class="form__text">
            Already have an account?
             <a class="form__link" href="/#/signin">Login</a>
            </div>
          </li>
        </ul>
      </form>
    </div>
    `;
  },
};

export default RegisterScreen;
