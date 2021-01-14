import { getCartItems } from "./localStorage";

export const parseRequestUrl = () => {
  const url = document.location.hash.toLowerCase();
  const request = url.split("/");
  return {
    resource: request[1],
    id: request[2],
    verb: request[3],
  };
};

export const rerender = async (component) => {
  document.getElementById(
    "main-container"
  ).innerHTML = await component.render();
  await component.after_render();
};

export const showLoading = () => {
  const loadingOverlay = document.querySelector(".loading-overlay");
  loadingOverlay.classList.add("active");
};

export const hideLoading = () => {
  const loadingOverlay = document.querySelector(".loading-overlay");
  loadingOverlay.classList.remove("active");
};

export const showMessage = (message, callback) => {
  const messageOverlay = document.querySelector(".message-overlay");
  messageOverlay.innerHTML = `
  <div class="message-overlay__container">
    <div class="message-overlay__content">${message}</div>
    <button class="btn message-overlay__close-btn">OK</button>
  </div>
  `;
  messageOverlay.classList.add("active");
  const closeBtn = document.querySelector(".message-overlay__close-btn");
  closeBtn.addEventListener("click", () => {
    messageOverlay.classList.remove("active");
    if (callback) {
      callback();
    }
  });
};

export const redirectUser = () => {
  if (getCartItems().length !== 0) {
    document.location.hash = "/shipping";
  } else {
    document.location.hash = "/";
  }
};
