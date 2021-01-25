const Footer = {
  render: () => {
    return `
      <div class='footer__content container'>
        <div class='footer__newsletter'>
          <h2 class='footer__title'>Signup for Our Newsletter</h2>
          <p class='footer__text'>Stay up to date with our latest news and products</p>
          <form class='footer__form'>
            <input type="text" placeholder='Your email address' class='footer__form--input' />
            <button type="submit" class='btn footer__form--btn btn--blue'>Subscribe</button>
          </form>
        </div>
        <div class='footer__service'>
        <h2 class='footer__title'>Customer Service</h2>
          <ul class='footer__list'>
            <li class='footer__list--item'>
              <a href='#' class='footer__text'> Delivery & Return</a>
            </li>
            <li class='footer__list--item'>
              <a href='#' class='footer__text'>My Account</a>
            </li>
            <li class='footer__list--item'>
              <a href='#' class='footer__text'>Privacy Policy</a>
            </li>
            <li class='footer__list--item'>
              <a href='#' class='footer__text'>Terms & Conditions</a>
            </li>
          </ul>
        </div>
        <div class='footer__contact'>
          <h2 class='footer__title'>Contact</h2>
          <ul class='footer__list'>
            <li class='footer__list--item'>
              <a href='#' class='footer__text'>Contact Us</a>
            </li>
            <li class='footer__list--item'>
              <a href='#' class='footer__text'>Store Directory</a>
            </li>
          </ul>
        </div>
        <div class='footer__social'>
          <h2 class='footer__title'>Follow Us</h2>
          <div class='footer__social--links'>
          <a class='footer__social--link' href='https://www.facebook.com' target="_blank"><img src="images/social-icons/facebook.svg" alt="facebook"/></a>
          <a class='footer__social--link' href='https://www.twitter.com' target="_blank"><img src="images/social-icons/twitter.svg" alt="twitter"/></a>
          <a class='footer__social--link' href='https://www.youtube.com' target="_blank"><img src="images/social-icons/youtube.svg" alt="youtube"/></a>
          </div>
        </div>
      </div>
    `;
  },
};

export default Footer;
