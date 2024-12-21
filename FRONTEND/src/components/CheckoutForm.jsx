import React, { useEffect, forwardRef } from "react";
import FormInput from "../shared/FormInput";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../features/cart/cartSlice";
import { useNavigate } from "react-router-dom";
import { useCreateOrderMutation } from "../features/orders/ordersApi";
import Swal from "sweetalert2";

const CheckoutForm = forwardRef(({ formValidation }, ref) => {
  const cartItems = useSelector((state) => state.cartState.cartItems);
  const orderTotal = useSelector((state) => state.cartState.orderTotal);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm({ mode: "onChange" });

  const [createOrder, { isLoading, error }] = useCreateOrderMutation();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Update form validity state in the parent
  useEffect(() => {
    formValidation(isValid);
    console.log(cartItems);
    
  }, [isValid, formValidation]);

  // Form submission handler
  const onSubmit = async (data) => {
    console.log("Form Data:", data);
    const { fName, email, phone, city, state, pincode } = data;

    const newOrder = {
      name: fName,
      email,
      phone,
      address: {
        city,
        state,
        pincode,
      },
      products: cartItems.map((item) => ({
        productId: item?._id,
        amount: item.amount,
      })),
      totalPrice: orderTotal,
    };
    console.log(newOrder);

    try {
      await createOrder(newOrder).unwrap();
      Swal.fire("Success", "Order placed successfully", "success");
      reset();
      navigate("/orderConfirmation");
      dispatch(clearCart());
    } catch (error) {
      console.error("Error placing an order", error);
      Swal.fire(
        "Error",
        "Failed to place the order. Please try again.",
        "error"
      );
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <form
      ref={ref}
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-y-4"
      aria-labelledby="checkout-form-title"
      role="form"
    >
      <h4 id="checkout-form-title" className="font-medium text-xl mb-4">
        Shipping Information
      </h4>
      <FormInput
        text="Full Name"
        type="text"
        id="fName"
        placeholder="Enter your full name here (up to 30 characters)"
        minLength={3}
        maxLength={30}
        register={register}
        required
        error={errors.fName}
        aria-labelledby="fName"
      />
      <FormInput
        text="Email Address"
        type="email"
        id="email"
        placeholder="Enter your email address here"
        register={register}
        required
        pattern={/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/}
        error={errors.email}
        aria-labelledby="email"
      />
      <FormInput
        text="Phone Number"
        type="tel"
        id="phone"
        pattern={/^[0-9]{10}$/}
        placeholder="Enter your phone number here"
        register={register}
        required
        error={errors.phone}
        aria-labelledby="phone"
      />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <FormInput
          text="City"
          type="text"
          id="city"
          placeholder="Enter your city name"
          register={register}
          required
          error={errors.city}
          aria-labelledby="city"
        />
        <FormInput
          text="State"
          type="text"
          id="state"
          placeholder="Enter your state name"
          register={register}
          required
          error={errors.state}
          aria-labelledby="state"
        />
        <FormInput
          text="Pin Code"
          type="tel"
          id="pincode"
          pattern={/^[0-9]{6}$/}
          placeholder="Enter your pincode"
          register={register}
          required
          error={errors.pincode}
          aria-labelledby="pincode"
        />
      </div>
      <button
        type="submit"
        className={`hidden lg:inline shadow-lg bg-offerColor text-white rounded-lg py-2 px-4 mt-4 transition duration-200 ease-in-out font-semibold text-lg ${
          isValid
            ? "opacity-100 hover:bg-blue-700"
            : "opacity-50 cursor-not-allowed"
        }`}
        disabled={!isValid}
        aria-disabled={!isValid}
      >
        Place your order
      </button>
    </form>
  );
});

export default CheckoutForm;
