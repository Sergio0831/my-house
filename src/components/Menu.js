import { hideMenu } from "../utils";
const links = [
  "Beds",
  "Kitchen",
  "Livink Room",
  "Bedroom",
  "Dining",
  "Office",
  "Children's Room",
  "Mattresses",
  "Accessories",
  "Beds",
];

const Menu = {
  after_render: () => {
    // Hide menu
    document
      .querySelector(".menu__close--btn")
      .addEventListener("click", hideMenu);
    // Append menu links
    const menuList = document.querySelector(".menu__list");
    for (const link of links) {
      menuList.insertAdjacentHTML(
        "afterbegin",
        `
      <li class="menu__item">
          <a href="#" class="menu__link">${link}</a>
        </li>
      `
      );
    }
  },
  render: () => {
    return `
    <div class="menu__container">
    <span class="menu__close--btn">
      <svg width="20" height="20" viewBox="0 0 10 10" fill="white" xmlns="http://www.w3.org/2000/svg">
        <g clip-path="url(#clip0)">
        <path d="M5.55221 5.00077L9.88534 0.667607C10.0379 0.515049 10.0379 0.267705 9.88534 0.115166C9.73279 -0.0373724 9.48544 -0.0373919 9.3329 0.115166L4.99975 4.44833L0.666615 0.115166C0.514057 -0.0373919 0.266713 -0.0373919 0.114175 0.115166C-0.0383642 0.267725 -0.0383837 0.515068 0.114175 0.667607L4.44731 5.00075L0.114175 9.3339C-0.0383837 9.48646 -0.0383837 9.73381 0.114175 9.88635C0.190444 9.96262 0.290424 10.0007 0.390404 10.0007C0.490385 10.0007 0.590345 9.96262 0.666634 9.88635L4.99975 5.55321L9.33288 9.88635C9.40915 9.96262 9.50913 10.0007 9.60911 10.0007C9.70909 10.0007 9.80905 9.96262 9.88534 9.88635C10.0379 9.73379 10.0379 9.48644 9.88534 9.3339L5.55221 5.00077Z" fill="#fff"/>
        </g>
        <defs>
        <clipPath id="clip0">
        <rect width="10" height="10" fill="white"/>
        </clipPath>
        </defs>
      </svg>
    </span>
      <ul class="menu__list">
      </ul>
    </div>
    `;
  },
};

export default Menu;
