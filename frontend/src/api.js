import axios from "axios";
import { apiUrl } from "./config";
import { getUserInfo } from "./localStorage";

/* Get Products Array*/
export const getProducts = async () => {
  try {
    const response = await axios({
      url: `${apiUrl}/api/products`,
      method: "GET",
    });
    if (response.statusText !== "OK") {
      throw new Error(response.data.message);
    }
    return response.data;
  } catch (err) {
    console.log(err);
    return { error: err.response.data.message || err.message };
  }
};

/* Get Single Product By Id */
export const getProduct = async (id) => {
  try {
    const response = await axios({
      url: `${apiUrl}/api/products/${id}`,
      method: "GET",
    });
    if (response.statusText !== "OK") {
      throw new Error(response.data.message);
    }
    return response.data;
  } catch (err) {
    return { error: err.response.data.message || err.message };
  }
};

/* Create Product */
export const createProduct = async () => {
  try {
    const { token } = getUserInfo();
    const response = await axios({
      url: `${apiUrl}/api/products`,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.statusText !== "Created") {
      throw new Error(response.data.message);
    }
    return response.data;
  } catch (err) {
    return { error: err.response.data.message || err.message };
  }
};

/* Delete Product */
export const deleteProduct = async (productId) => {
  try {
    const { token } = getUserInfo();
    const response = await axios({
      url: `${apiUrl}/api/products/${productId}`,
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.statusText !== "OK") {
      throw new Error(response.data.message);
    }
    return response.data;
  } catch (err) {
    return { error: err.response.data.message || err.message };
  }
};

/* Update Product */
export const updateProduct = async (product) => {
  try {
    const { token } = getUserInfo();
    const response = await axios({
      url: `${apiUrl}/api/products/${product._id}`,
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: product,
    });
    if (response.statusText !== "OK") {
      throw new Error(response.data.message);
    }
    return response.data;
  } catch (err) {
    return { error: err.response.data.message || err.message };
  }
};

/* Upload product image */
export const uploadProductImage = async (formData) => {
  try {
    const { token } = getUserInfo();
    const response = await axios({
      url: `${apiUrl}/api/uploads`,
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
      data: formData,
    });
    if (response.statusText !== "Created") {
      throw new Error(response.data.message);
    } else {
      return response.data;
    }
  } catch (err) {
    return { error: err.response.data.message || err.message };
  }
};

/* Login Screen */
export const signin = async ({ email, password }) => {
  try {
    const response = await axios({
      url: `${apiUrl}/api/users/signin`,
      method: "POST",
      header: {
        "Content-Type": "application/json",
      },
      data: {
        email,
        password,
      },
    });
    if (response.statusText !== "OK") {
      throw new Error(response.data.message);
    }
    return response.data;
  } catch (err) {
    console.log(err);
    return { error: err.response.data.message || err.message };
  }
};

/* Register Screen */
export const register = async ({ name, email, password }) => {
  try {
    const response = await axios({
      url: `${apiUrl}/api/users/register`,
      method: "POST",
      header: {
        "Content-Type": "application/json",
      },
      data: {
        name,
        email,
        password,
      },
    });
    if (response.statusText !== "OK") {
      throw new Error(response.data.message);
    }
    return response.data;
  } catch (err) {
    console.log(err);
    return { error: err.response.data.message || err.message };
  }
};

/* Profile Screen */
export const update = async ({ name, email, password }) => {
  try {
    const { _id, token } = getUserInfo();
    const response = await axios({
      url: `${apiUrl}/api/users/${_id}`,
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        name,
        email,
        password,
      },
    });
    if (response.statusText !== "OK") {
      throw new Error(response.data.message);
    }
    return response.data;
  } catch (err) {
    console.log(err);
    return { error: err.response.data.message || err.message };
  }
};

/* Place Order Screen */
export const createOrder = async (order) => {
  try {
    const { token } = getUserInfo();
    const response = await axios({
      url: `${apiUrl}/api/orders/`,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: order,
    });
    if (response.statusText !== "Created") {
      throw new Error(response.data.message);
    }
    return response.data;
  } catch (err) {
    return {
      error: err.response ? err.response.data.message : err.message,
    };
  }
};

/* Order Screen */
export const getOrder = async (id) => {
  try {
    const { token } = getUserInfo();
    const response = await axios({
      url: `${apiUrl}/api/orders/${id}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.statusText !== "OK") {
      throw new Error(response.data.message);
    }
    return response.data;
  } catch (err) {
    return { error: err.message };
  }
};

/* Get My Orders */
export const getMyOrders = async () => {
  try {
    const { token } = getUserInfo();
    const response = await axios({
      url: `${apiUrl}/api/orders/mine`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.statusText !== "OK") {
      throw new Error(response.data.message);
    }
    return response.data;
  } catch (err) {
    return {
      error: err.response ? err.response.data.message : err.message,
    };
  }
};

/* Get Orders Array*/
export const getOrders = async () => {
  const { token } = getUserInfo();
  try {
    const response = await axios({
      url: `${apiUrl}/api/orders`,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.statusText !== "OK") {
      throw new Error(response.data.message);
    }
    return response.data;
  } catch (err) {
    console.log(err);
    return { error: err.response.data.message || err.message };
  }
};

/* Delete Order */
export const deleteOrder = async (orderId) => {
  try {
    const { token } = getUserInfo();
    const response = await axios({
      url: `${apiUrl}/api/orders/${orderId}`,
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.statusText !== "OK") {
      throw new Error(response.data.message);
    }
    return response.data;
  } catch (err) {
    return { error: err.response.data.message || err.message };
  }
};

/* Get Paypal Client ID */
export const getPaypalClientId = async () => {
  const response = await axios({
    url: `${apiUrl}/api/paypal/clientId`,
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.statusText !== "OK") {
    throw new Error(response.data.message);
  }
  return response.data.clientId;
};

export const payOrder = async (orderId, paymentResult) => {
  try {
    const { token } = getUserInfo();
    const response = await axios({
      url: `${apiUrl}/api/orders/${orderId}/pay`,
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: paymentResult,
    });
    if (response.statusText !== "OK") {
      throw new Error(response.data.message);
    }
    return response.data;
  } catch (err) {
    return {
      error: err.response ? err.response.data.message : err.message,
    };
  }
};
