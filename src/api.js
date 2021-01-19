import client from "../config";

/* Get Products Array*/
export const getProducts = async () => {
  try {
    const response = await client.getEntries({
      content_type: "myHouse",
    });
    let products = response.items;
    products = products.map((item) => {
      const {
        title,
        price,
        rating,
        category,
        countInStok,
        description,
      } = item.fields;
      const { id } = item.sys;
      const image = item.fields.image.fields.file.url;
      return {
        title,
        price,
        rating,
        category,
        countInStok,
        description,
        id,
        image,
      };
    });
    return products;
  } catch (err) {
    console.log(err);
  }
};

/* Get Single Product By Id */
export const getProduct = async (id) => {
  try {
    const response = await client.getEntries({
      content_type: "myHouse",
    });
    let products = response.items;
    products = products.map((item) => {
      const {
        title,
        price,
        rating,
        category,
        countInStok,
        description,
      } = item.fields;
      const { id } = item.sys;
      const image = item.fields.image.fields.file.url;
      return {
        title,
        price,
        rating,
        category,
        countInStok,
        description,
        id,
        image,
      };
    });
    return id;
  } catch (err) {
    console.log(err);
  }
};
