// import { createProduct, deleteProduct, getProducts } from "../api";
// import DashboardMenu from "../components/DasboardMenu";
// import { showLoading, hideLoading, rerender, showMessage } from "../utils";

// const ProductListScreen = {
//   after_render: () => {
//     const createButton = document.getElementById("create-button");
//     const editButtons = document.querySelectorAll(".btn--edit");
//     const deleteButtons = document.querySelectorAll(".btn--delete");
//     createButton.addEventListener("click", async () => {
//       const data = await createProduct();
//       document.location.hash = `/product/${data.product._id}/edit`;
//     });
//     Array.from(editButtons).forEach((editButton) => {
//       editButton.addEventListener("click", () => {
//         document.location.hash = `/product/${editButton.id}/edit`;
//       });
//     });
//     Array.from(deleteButtons).forEach((deleteButton) => {
//       deleteButton.addEventListener("click", async () => {
//         if (confirm("Are you sure to delete this product?")) {
//           showLoading();
//           const data = await deleteProduct(deleteButton.id);
//           if (data.error) {
//             showMessage(data.error);
//           } else {
//             rerender(ProductListScreen);
//           }
//           hideLoading();
//         }
//       });
//     });
//   },
//   render: async () => {
//     const products = await getProducts();
//     return `
//     <div class="dashboard">
//       ${DashboardMenu.render({ selected: "products" })}
//       <div class="dashboard__content">
//         <h1 class="dashboard__title">Products</h1>
//         <button id="create-button" class="btn btn--blue btn--create">Create Product</button>
//         <div>
//           <table class="products-table">
//             <thead>
//               <tr>
//                 <th class="column1">Id</th>
//                 <th class="column2">Name</th>
//                 <th class="column3">Price</th>
//                 <th class="column4">Category</th>
//                 <th class="column5">Brand</th>
//                 <th class="column6">Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               ${products
//                 .map(
//                   (product) => `
//               <tr>
//                 <td class="column1">${product._id}</td>
//                 <td class="column2">${product.name}</td>
//                 <td class="column3">${product.price}</td>
//                 <td class="column4">${product.category}</td>
//                 <td class="column5">${product.brand}</td>
//                 <td class="column6">
//                   <button id="${product._id}" class="btn btn--edit btn--yellow">Edit</button>
//                   <button id="${product._id}" class="btn btn--delete">Delete</button>
//                 </td>
//               </tr>
//               `
//                 )
//                 .join("\n")}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//     `;
//   },
// };

// export default ProductListScreen;
