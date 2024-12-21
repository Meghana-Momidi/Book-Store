import { createSlice } from "@reduxjs/toolkit";
import Swal from "sweetalert2";

const initialState = {
  cartItems: [],
  numItemsInCart: 0,  
  cartTotal: 0,
  shipping: 5,
  tax: 0, 
  orderTotal: 0,
};
const getCartFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem("cart")) || initialState;
};

export const cartSlice = createSlice({
  name: "cart",
  initialState: getCartFromLocalStorage(),
  reducers: {
    addItem: (state, action) => {
      const { product } = action.payload;
      const existingProduct = state.cartItems.find(
        (item) => item._id === product._id
      );
      if (!existingProduct) {
        product.amount = 1;
        state.cartItems.push(product);
      } else {
        existingProduct.amount++;
      }
      state.numItemsInCart += 1;
      state.cartTotal += parseFloat((product.newPrice).toFixed(2));
      cartSlice.caseReducers.calculateTotals(state);
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Product added to cart",
        showConfirmButton: false,
        timer: 1500,
      });
    },
    clearCart: (state) => {
      localStorage.setItem("cart", JSON.stringify(initialState));
      return initialState;
    },
    removeItem: (state, action) => {
      const { productId } = action.payload;
      const product = state.cartItems.find((item) => item._id === productId);
      state.cartItems = state.cartItems.filter(
        (item) => item._id !== productId
      );
      state.numItemsInCart -= product.amount;
      state.cartTotal -= parseFloat((product.newPrice * product.amount).toFixed(
        2
      ));
      cartSlice.caseReducers.calculateTotals(state);
    },
    calculateTotals: (state) => {
      state.tax = parseFloat((0.1 * state.cartTotal).toFixed(2));
      state.orderTotal = parseFloat(
        (state.cartTotal + state.shipping + state.tax).toFixed(2)
      );
      localStorage.setItem("cart", JSON.stringify(state));
    },
  },
});

export const { addItem, clearCart, removeItem } = cartSlice.actions;

export default cartSlice.reducer;
