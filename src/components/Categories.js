const Categories = {
  render: () => {
    return `
    <section class="categories" id="categories">
      <div class="container">
        <div class="gallery">
          <figure class="gallery__item gallery__item--1">
            <img src="../images/gallery/image-1.jpg" class="gallery__img" alt="Image 1">
          </figure>
          <figure class="gallery__item gallery__item--2">
            <img src="../images/gallery/image-2.jpg" class="gallery__img" alt="Image 2">
          </figure>
          <figure class="gallery__item gallery__item--3">
            <img src="../images/gallery/image-3.jpg" class="gallery__img" alt="Image 3">
          </figure>
          <figure class="gallery__item gallery__item--4">
            <img src="../images/gallery/image-4.jpg" class="gallery__img" alt="Image 4">
          </figure>
          <figure class="gallery__item gallery__item--5">
            <img src="../images/gallery/image-5.jpg" class="gallery__img" alt="Image 5">
          </figure>
        </div>
      </div>
    </section>;
    `;
  },
};

export default Categories;
