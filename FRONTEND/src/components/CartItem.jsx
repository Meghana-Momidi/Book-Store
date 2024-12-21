import React from "react";
import { getImgUrl } from "../utils/gettImgUrl";
import { useDispatch } from "react-redux";
import { removeItem } from "../features/cart/cartSlice";
import Swal from "sweetalert2";

const CartItem = ({ cartItem }) => {
  const {
    _id: id,
    newPrice: price,
    title,
    amount,
    coverImage,
    category,
    orderTotal,
  } = cartItem;
  const dispatch = useDispatch();

  const handleRemoveItem = () => {  
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to remove this item from the cart?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, remove it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(removeItem({ productId: id }));
        Swal.fire(
          "Removed!",
          "The item has been removed from your cart.",
          "success"
        );
      }
    });
  };

  return (
    <section className="grid md:grid-cols-3 gap-y-4 sm:grid-cols-1 border-b border-base-300 pb-6 last:border-b-0 mt-4" aria-labelledby={`cart-item-${id}`}>
      <img
        className="h-24 w-24 rounded-lg sm:h-32 sm:w-32 ml-10"
        src={`${getImgUrl(coverImage)}`}
        alt={`Cover image of ${title} in the ${category} category`} // More descriptive alt text
        aria-hidden="false" // Ensure the image is announced properly
      />
      <div>
        <h2 className="capitalize font-medium" id={`title-${id}`}>{title}</h2>
        <h3 className="capitalize text-md text-neutral-content mt-2 italic" aria-labelledby={`category-${id}`}>
          {category}
        </h3>
        <p className="mt-4 text-sm capitalize flex items-center gap-x-2">
          Qty: {amount}
        </p>
        <button
          onClick={handleRemoveItem}
          className="cursor-pointer text-sm text-gray-500 mt-4"
          aria-label={`Remove ${title} from cart`}
        >
          Remove
        </button>
      </div>
      <div>
        <h2 className="font-bold ml-20">$ {price * amount}</h2>
      </div>
    </section>
  );
};

export default CartItem;
