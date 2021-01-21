const Categories = {
  render: () => {
    return `
    <section class="categories" id="categories">
      <div class="container">
        <div class="gallery">
          <figure class="gallery__item gallery__item--1">
           <a class="gallery__item--link" href="#">
            <img src="../images/gallery/image-1.jpg" class="gallery__img" alt="Image 1">
           </a>
            <div class="categories__btn--wrapper">
              <a href="#" class="btn--categories btn">SHOP DINNING</a>
            </div>
          </figure>
          <figure class="gallery__item gallery__item--2">
            <a class="gallery__item--link" href="#">
              <img src="../images/gallery/image-2.jpg" class="gallery__img" alt="Image 2">
            </a>
            <div class="categories__btn--wrapper">
              <a href="#" class="btn--categories btn">SHOP BEDROOM</a>
            </div>
          </figure>
          <figure class="gallery__item gallery__item--3">
            <a class="gallery__item--link" href="#">
              <img src="../images/gallery/image-3.jpg" class="gallery__img" alt="Image 3">
            </a>  
            <div class="categories__btn--wrapper">
              <a href="#" class="btn--categories btn">SHOP BEDS</a>
            </div>
          </figure>
          <figure class="gallery__item gallery__item--4">
            <a class="gallery__item--link" href="#">
              <img src="../images/gallery/image-4.jpg" class="gallery__img" alt="Image 4">
            </a>  
            <div class="categories__btn--wrapper">
              <a href="#" class="btn--categories btn">SHOP LIVING ROOM</a>
            </div>
          </figure>
          <figure class="gallery__item gallery__item--5">
            <a class="gallery__item--link" href="#">
              <img src="../images/gallery/image-5.jpg" class="gallery__img" alt="Image 5">
            </a>
            <div class="categories__btn--wrapper">
              <a href="#" class="btn--categories btn">SHOP KITCHEN</a>
            </div>
          </figure>
        </div>
      </div>
    </section>
    `;
  },
};

export default Categories;
