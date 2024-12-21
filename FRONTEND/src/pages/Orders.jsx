import React from "react";
import { useGetOrdersByEmailQuery } from "../features/orders/ordersApi";
import { getImgUrl } from "../utils/gettImgUrl";
import { useNavigate } from "react-router-dom";
import Loader from "../shared/Loader";

const Orders = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const {
    data: orders,
    isLoading,
    isError,
    error,
  } = useGetOrdersByEmailQuery(currentUser?.email);
  console.log(orders);
  const navigate = useNavigate();

  // Helper function to format date and time
  const formatOrderDate = (createdAt) => {
    const date = new Date(createdAt);
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };
    return date.toLocaleString("en-GB", options);
  };

  const handleClick = (id) => {
    navigate(`/books/${id}`);
  };

  if (isLoading) return <Loader />;

  if (isError) {
    const errorMessage = error?.data?.message || "Error getting orders";
    return (
      <div
        className="h-screen flex items-center justify-center"
        aria-live="assertive"
      >
        <span className="text-xl text-red-600">{errorMessage}</span>
      </div>
    );
  }

  return (
    <div className="h-full py-10 px-5 sm:px-10 mb-20">
      <h1
        className="text-3xl font-semibold text-center mb-8"
        id="orders-heading"
        role="heading"
        aria-level="1"
      >
        Your Orders
      </h1>

      {orders.length === 0 ? (
        <div className="text-center text-xl text-gray-500" role="alert">
          No orders found!
        </div>
      ) : (
        <div className="flex justify-center">
          <div className="space-y-8 w-2/3 ">
            {orders.map((order) => {
              const { id, createdAt, totalPrice, products } = order;
              return (
                <div
                  key={id}
                  className="rounded-lg bg-white shadow-lg p-6 dark:bg-dark-book-card"
                  aria-labelledby={`order-${id}`}
                >
                  <div className="flex justify-between items-center">
                    <h2
                      id={`order-${id}`}
                      className="text-xl font-bold text-gray-800 dark:text-dark-text"
                      role="heading"
                      aria-level="2"
                    >
                      Order ID: {id}
                    </h2>
                    <div className="font-semibold text-lg">
                      Total : $ {totalPrice}
                    </div>
                  </div>

                  <p className="text-lg text-gray-600 my-4">
                    Order placed on {formatOrderDate(createdAt)}
                  </p>
                  <div className="mt-4 space-y-10">
                    {products.map((item) => {
                      const { productDetails, amount } = item;
                      const {
                        title,
                        coverImage,
                        newPrice: price,
                        _id: bookId,
                      } = productDetails;
                      return (
                        <div
                          key={item._id}
                          className="flex items-center space-x-4"
                        >
                          <img
                            className="h-24 w-24 sm:h-32 sm:w-32 rounded-lg"
                            src={getImgUrl(coverImage)}
                            alt={`Cover image of ${title}`}
                            loading="lazy"
                          />
                          <div className="flex-1">
                            <h3 className="font-semibold text-lg mb-4">
                              {title}
                            </h3>
                            <p>$ {price}</p>
                            <p className="mt-4 text-sm capitalize flex items-center gap-x-2">
                              Qty : {amount}
                            </p>
                          </div>
                          <button
                            className="btn-primary px-6 flex items-center gap-1 mt-10 justify-center"
                            onClick={() => handleClick(bookId)}
                            aria-label={`Buy again ${title}`}
                          >
                            Buy Again
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;
